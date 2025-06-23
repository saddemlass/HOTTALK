// client/src/components/CallRoom.jsx

import React, { useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { AppContext } from '../context/AppContext';
import '../styles/CallRoom.css';

export default function CallRoom() {
  const { roomID, setRoomID, userUUID } = useContext(AppContext);
  const socketRef = useRef(null);
  const peerRef   = useRef(null);
  const localVid  = useRef(null);
  const remoteVid = useRef(null);

  useEffect(() => {
    // 1. Connexion Socket.IO
    socketRef.current = io('http://localhost:4000', {
      withCredentials: true,
    });

    // 2. getUserMedia
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        // Affiche ton flux
        if (localVid.current) localVid.current.srcObject = stream;

        // Crée la PeerConnection
        peerRef.current = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        // Ajoute tes pistes à la PeerConnection
        stream.getTracks().forEach(track => {
          peerRef.current.addTrack(track, stream);
        });

        // Relay ICE candidates vers le serveur
        peerRef.current.onicecandidate = ({ candidate }) => {
          if (candidate) {
            socketRef.current.emit('ice-candidate', { roomID, candidate });
          }
        };

        // Quand on reçoit un flux distant…
        peerRef.current.ontrack = ({ streams: [remoteStream] }) => {
          if (remoteVid.current) remoteVid.current.srcObject = remoteStream;
        };

        // 3. Signalisation WebRTC
        socketRef.current.emit('join-room', { roomID, userUUID });

        socketRef.current.on('ready', async () => {
          // Si tu es second arrivé, crée une offre
          const offer = await peerRef.current.createOffer();
          await peerRef.current.setLocalDescription(offer);
          socketRef.current.emit('offer', { roomID, sdp: peerRef.current.localDescription });
        });

        socketRef.current.on('offer', async ({ sdp }) => {
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
          const answer = await peerRef.current.createAnswer();
          await peerRef.current.setLocalDescription(answer);
          socketRef.current.emit('answer', { roomID, sdp: peerRef.current.localDescription });
        });

        socketRef.current.on('answer', async ({ sdp }) => {
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        });

        socketRef.current.on('ice-candidate', async ({ candidate }) => {
          try {
            await peerRef.current.addIceCandidate(candidate);
          } catch (e) {
            console.error('ICE candidate error:', e);
          }
        });
      })
      .catch(err => console.error('getUserMedia error:', err));

    // Cleanup quand on quitte le composant
    return () => {
      if (peerRef.current) {
        peerRef.current.close();
        peerRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [roomID, userUUID]);

  const handleQuit = () => {
    // On quitte la room et on revient au formulaire
    setRoomID(null);
  };

  return (
    <div className="call-room">
      <div className="video-container">
        <video ref={localVid} autoPlay muted playsInline />
        <video ref={remoteVid} autoPlay playsInline />
      </div>
      <button className="btn quit" onClick={handleQuit}>
        Quitter l’appel
      </button>
    </div>
  );
}
