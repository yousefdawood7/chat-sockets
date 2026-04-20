import { createServer } from 'http';
import { Server } from 'socket.io';

import { app } from './app';

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(socket.id, 'Socket Connected Successfully');

  socket.on('typing', ({ id, isTyping }) => {
    io.emit('server-typing', { id, isTyping });
  });
});

server.listen(3000, () => {
  console.log('Server listening on 3000');
});
