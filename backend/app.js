import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

io.on('connection', socket => {
  console.log(`a user connected ${socket.id}`);

  socket.on('send_message', data => {
    console.log(data);
    socket.broadcast.emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

//routes
app.use('/users/register', userRoute);

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
