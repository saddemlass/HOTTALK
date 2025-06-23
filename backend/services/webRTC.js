// server/services/webRTC.js
module.exports = io => {
  io.on('connection', socket => {
    socket.on('webrtc-offer', data => {
      socket.to(data.room_id).emit('webrtc-offer', data);
    });
    socket.on('webrtc-answer', data => {
      socket.to(data.room_id).emit('webrtc-answer', data);
    });
    socket.on('webrtc-ice', data => {
      socket.to(data.room_id).emit('webrtc-ice', data);
    });
    socket.on('join-room', room_id => {
      socket.join(room_id);
    });
    socket.on('leave', room_id => {
      socket.leave(room_id);
    });
  });
};