import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import sqlite3 from 'sqlite3';
import cookieParser from 'cookie-parser';
import { log } from 'node:console';
import authenticateToken from './utils/authenticateToken.js';

const app = express();
const server = createServer(app);
const io = new Server(server);
const sqlite = sqlite3.verbose();
let sql;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//routes
app.use('/api/users', userRoute);
app.use('/api/message', authenticateToken, messageRoute);

io.on('connection', socket => {
  socket.on('register_user', data => {
    console.log(`a user connected ${socket.id}`);
    console.log(socket.username);
    users.push(socket.io);
  });

  socket.on('send_message', async data => {
    console.log(data);
    socket.broadcast.emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
    // users = users.filter(usr => usr !== socket.id);
  });
});

// connect to db
const db = new sqlite3.Database('./model/app.db', sqlite3.OPEN_READWRITE, err => {
  if (err) return console.error(err.message);
});

// create table
// sql = 'CREATE TABLE user(id INTEGER PRIMARY KEY, username TEXT, password TEXT, date DATETIME)';
// db.run(sql);

// insert data into table
// sql = 'INSERT INTO users(username, password) VALUES (?,?)';
// const users = [
//   {
//     username: 'Larry',
//     password: '1234',
//   },
//   {
//     username: 'Sean',
//     password: '1234',
//   },
//   {
//     username: 'Micheal',
//     password: '1234',
//   },
//   {
//     username: 'Lena',
//     password: '1234',
//   },
//   {
//     username: 'Randy',
//     password: '1234',
//   },
//   {
//     username: 'Shane',
//     password: '1234',
//   },
//   {
//     username: 'Dustin',
//     password: '1234',
//   },
// ];
// users.forEach(usr => {
//   db.run(sql, [usr.username, usr.password], err => {
//     if (err) return console.error(err.message);
//   });
// });

//query the data
// sql = 'SELECT * FROM message';
// db.all(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   rows.forEach(row => console.log(row));
// });

// create conversation table
// sql =
//   'CREATE TABLE conversation(id INTEGER PRIMARY KEY, user1 INTEGER, user2 INTEGER, FOREIGN KEY (user1) REFERENCES user(id), FOREIGN KEY (user2) REFERENCES user(id))';
// db.run(sql);

// delete row table
// sql = "DELETE from users where username like ''";
// db.run(sql);

// insert conversation data
// sql = 'INSERT INTO conversation(user1, user2) VALUES (?,?)';
// db.run(sql, ['Larry', 'Shane'], err => {
//   if (err) return console.error(err.message);
// });

// create message table
// sql =
//   'CREATE TABLE message(id INTEGER PRIMARY KEY, text TEXT NOT NULL, senderId INTEGER NOT NULL, receiverId INTEGER NOT NULL, date DATETIME, conversation_id INTEGER NOT NULL, FOREIGN KEY (conversation_id) REFERENCES conversation (id) )';
// db.run(sql);

// insert message into message table
// sql = 'INSERT INTO message(text, sender, receiver, conversation_id) VALUES(?,?,?,?)';
// db.run(sql, ["Hello Larry, my name is Shane, we have a wonderful day, don't we?", 'Shane', 'Larry', 1], err => {
//   if (err) return console.error(err.message);
// });

// sql = 'DROP TABLE IF EXISTS message';
// db.run(sql);

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
