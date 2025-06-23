import React, { useEffect, useState, useContext } from 'react';
import { socket } from '../services/socket';
import { AppContext } from '../context/AppContext';
import '../styles/StickerPicker.css';

function StickerPicker() {
  const { roomID, userUUID } = useContext(AppContext);
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const contexts = require.context('../assets/stickers', false, /\.png$/);
    setStickers(contexts.keys().map(contexts));
  }, []);

  const sendSticker = (sticker) => {
    const msg = { roomID, userUUID, sticker, timestamp: new Date().toISOString(), type: 'sticker' };
    socket.emit('chat-sticker', msg);
  };

  return (
    <div className="sticker-picker">
      {stickers.map((src,i) => (
        <img key={i} src={src} alt={`sticker-${i}`} onClick={() => sendSticker(src)} className="sticker" />
      ))}
    </div>
  );
}

export default StickerPicker;
