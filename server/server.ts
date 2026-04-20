import 'dotenv/config';

import { createServer } from 'http';
import { Server } from 'socket.io';

import { app } from './app';

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.APP_URL ?? 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log(socket.id, 'Socket Connected Successfully');

  socket.on('typing', ({ id, isTyping }) => {
    io.emit('server-typing', { id, isTyping });
  });

  socket.on('send', ({ id, message }) => {
    io.emit('server-send', { id, message });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on', process.env.PORT || 3000);
});
