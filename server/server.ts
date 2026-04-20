import { createServer } from 'http';
import { Server } from 'socket.io';

import { app } from './app';

const server = createServer(app);

export const io = new Server(server);

app.listen(3000, () => {
  console.log('Server listening on 3000');
});
