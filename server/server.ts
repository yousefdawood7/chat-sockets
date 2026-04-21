import 'dotenv/config';

import { createServer } from 'http';
import { Server } from 'socket.io';

import { app } from './app';

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_APP_URL ?? 'http://localhost:1234',
    methods: ['GET', 'POST'],
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

const PORT = +process.env.PORT! || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log('Server listening on', PORT);
});
