import React, { useContext, useState, useEffect, useRef } from 'react';
import { socket } from '../services/socket';
import { AppContext } from '../context/AppContext';
import '../styles/ChatBox.css';

function ChatBox() {
  const { roomID, userUUID } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    socket.on('chat-message', msg => setMessages(prev => [...prev, msg]));
    return () => socket.off('chat-message');
  }, []);

  const sendMessage = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    const msg = {
      roomID,
      userUUID,
      text,
      timestamp: new Date().toISOString(),
      type: 'text'
    };
    socket.emit('chat-message', msg);
    setMessages(prev => [...prev, msg]);
    inputRef.current.value = '';
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message${msg.userUUID === userUUID ? ' mine' : ''}`}>
            <span className="text">{msg.text}</span>
            <span className="time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input type="text" ref={inputRef} className="chat-input" placeholder="Tapez un message…" />
        <button onClick={sendMessage} className="btn send">Envoyer</button>
      </div>
    </div>
  );
}

export default ChatBox;
