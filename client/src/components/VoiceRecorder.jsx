import React, { useRef, useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { socket } from '../services/socket';
import '../styles/VoiceRecorder.css';

function VoiceRecorder() {
  const { roomID, userUUID } = useContext(AppContext);
  const mediaRecorder = useRef(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    async function init() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        const form = new FormData();
        form.append('user_uuid', userUUID);
        form.append('room_id', roomID);
        form.append('file', e.data, `voice_${Date.now()}.webm`);
        fetch('/api/voice-notes', { method: 'POST', credentials: 'include', body: form });
      };
    }
    init();
  }, [roomID, userUUID]);

  const start = () => {
    mediaRecorder.current.start();
    setRecording(true);
  };
  const stop = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div className="voice-recorder">
      <button onClick={recording ? stop : start} className={`btn ${recording ? 'stop' : 'record'}`}>
        {recording ? 'Arrêter' : 'Enregistrer'}
      </button>
    </div>
  );
}

export default VoiceRecorder;
