let io;
import { Server } from 'socket.io';
const socketConnection = server => {
  const io = new Server(server);
  io.on('connection', socket => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.join(socket.request._query.id);
    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
  });
};

export default socketConnection;
