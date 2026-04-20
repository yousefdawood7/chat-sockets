import { io } from 'socket.io-client';
import { showTypingIndicator } from './chat';

// console.log(io);

export const socket = io('ws://localhost:3000');

socket.on('connect', () => {});

socket.on('server-typing', (data) => {
  console.log(data === socket.id);
  // prettier-ignore
  if (data.id !== socket.id)
    showTypingIndicator();
});
