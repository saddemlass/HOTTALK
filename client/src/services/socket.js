// client/src/services/socket.js
import { io } from 'socket.io-client';
export const socket = io('/', { withCredentials: true });
