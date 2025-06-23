// server/services/matchmaking.js
const queue = [];

module.exports = {
  joinQueue: (user_uuid, filters) => {
    // trouver un pair compatible
    const index = queue.findIndex(item => JSON.stringify(item.filters) === JSON.stringify(filters));
    if (index !== -1) {
      const peer = queue.splice(index, 1)[0];
      const room_id = `${user_uuid}-${peer.user_uuid}`;
      return { peer_uuid: peer.user_uuid, room_id };
    }
    queue.push({ user_uuid, filters });
    return null;
  }
};