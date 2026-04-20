import { io } from 'socket.io-client';
import {
  addIncomingMessage,
  appendMessage,
  hideTypingIndicator,
  showTypingIndicator,
} from './chat';

// console.log(io);

export const socket = io('ws://localhost:3000');

let id;

const handlingTypingIndicator = function () {
  clearTimeout(id);
  showTypingIndicator();

  id = setTimeout(() => {
    hideTypingIndicator();
  }, 2500);
};

const handlingSendMessages = function () {};

socket.on('connect', () => {});

socket.on('server-typing', (data) => {
  console.log(data === socket.id);
  // prettier-ignore
  if (data.id !== socket.id)
    handlingTypingIndicator();
});

socket.on('server-send', (data) => {
  console.log(data === socket.id);
  // prettier-ignore
  if (data.id === socket.id)
    appendMessage(data.message, 'sent')

  // prettier-ignore
  if (data.id !== socket.id)
    addIncomingMessage(data.message);
});
