import { io } from 'socket.io-client';
import { hideTypingIndicator, showTypingIndicator } from './chat';

// console.log(io);

export const socket = io('ws://localhost:3000');

let id;

const handlingTypingIndicator = function () {
  clearTimeout(id);
  showTypingIndicator();

  id = setTimeout(() => {
    console.log('CALLED');
    hideTypingIndicator();
  }, 2500);
};
socket.on('connect', () => {});

socket.on('server-typing', (data) => {
  console.log(data === socket.id);
  // prettier-ignore
  if (data.id !== socket.id)
    handlingTypingIndicator();
});
