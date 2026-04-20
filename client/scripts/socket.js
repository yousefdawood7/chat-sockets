import { io } from 'socket.io-client';
import {
  addIncomingMessage,
  appendMessage,
  hideTypingIndicator,
  showTypingIndicator,
} from './chat';

export const socket = io(process.env.APP_URL ?? 'http://localhost:3000');

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
  // prettier-ignore
  if (data.id !== socket.id)
    handlingTypingIndicator();
});

socket.on('server-send', (data) => {
  // prettier-ignore
  if (data.id === socket.id)
    appendMessage(data.message, 'sent')

  // prettier-ignore
  if (data.id !== socket.id)
    addIncomingMessage(data.message);
});
