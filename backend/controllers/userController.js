import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import { unlink } from 'node:fs';

const sqlite = sqlite3.verbose();
const db = new sqlite3.cached.Database('./model/app.db', sqlite3.OPEN_READWRITE, err => {
  if (err) return console.error(err.message);
});
let sql;

const connectedUsers = [];

const getConversationId = (userOneId, userTwoId) => {
  const conversationId = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT id FROM conversation WHERE user1 LIKE '${userOneId}' AND user2 LIKE '${userTwoId}' OR user1 LIKE '${userTwoId}' AND user2 LIKE '${userOneId}'`;
    db.all(sql, [], (err, rows) => {
      if (err) return console.log(err.message);
      rows.forEach(row => {
        conversationId.push(row.id);
      });
      resolve(conversationId);
    });
  });
};

const getUserId = username => {
  const userId = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT id FROM user WHERE username LIKE '${username}'`;
    db.all(sql, [], (err, rows) => {
      if (err) return console.log(err.message);
      rows.forEach(row => {
        userId.push(row.id);
      });
      resolve(userId);
    });
  });
};

const getMessages = id => {
  const messages = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM message WHERE senderId NOT LIKE '${id}' OR receiverId NOT LIKE '${id}'`;
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);
      rows.forEach(row => {
        if (err) return console.error(err.message);
        messages.push(row);
      });
      resolve(messages);
    });
  });
};

const getUsers = id => {
  const users = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT username, id, socketId FROM user WHERE id NOT LIKE '${id}'`;
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);
      rows.forEach(row => {
        users.push(row);
      });
      resolve(users);
    });
  });
};

const getUser = username => {
  let users = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT username, password, id, profilePicturePath FROM user WHERE username LIKE '${username}'`;
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);
      rows.forEach(row => {
        if (err) return console.error(err.message);
        users.push(row);
      });
      resolve(users);
    });
  });
};

const getUserById = id => {
  let users = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT username, password, id, profilePicturePath FROM user WHERE id LIKE '${id}'`;
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);
      rows.forEach(row => {
        if (err) return console.error(err.message);
        users.push(row);
      });
      resolve(users);
    });
  });
};

const registerUser = async (req, res) => {
  console.log('hello register');
  const { username, password, rePassword } = req.body;
  const passwordMatch = password === rePassword;
  // check for password match
  if (!passwordMatch) return res.json({ error: 'Passwords do not match backend' });
  const users = await getUser(username);

  // check if user already exists
  const usernameExists = users.some(user => user.username === username);
  if (usernameExists) {
    return res.json({ error: 'User already exists with that username!' });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    sql = 'INSERT INTO user(username, password) VALUES (?,?)';
    db.run(sql, [username, hashedPassword], err => {
      if (err) return console.error(err.message);
      generateTokenAndSetCookie(username, res);
      console.log(username);
      return res.json({ success: 'Success, please login' });
    });
  }
};

const loginUser = async (req, res) => {
  console.log(req.cookies.jwt);
  const { username, password } = req.body;
  const userArr = await getUser(username);
  if (userArr.length === 0) return res.json({ error: 'Invalid credentials!' });
  const passwordMatch = await bcrypt.compare(password, userArr[0].password);
  if (!passwordMatch) return res.json({ error: 'Invalid password' });
  const userId = userArr[0].id;

  generateTokenAndSetCookie(userId, res);
  const messages = await getMessages(userId);
  const users = await getUsers(userId);
  return res.json({ user: { username, id: userId, profilePicturePath: userArr[0].profilePicturePath }, users, messages });
  // if (!isUser) {
  //   res.json({ error: 'Wrong Credentials' });
  // }
};

const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('logout error', error.message);
  }
};

const updateUser = async (req, res) => {
  if (!req.file) return;
  console.log('user update');
  const userArr = await getUserById(req.id);
  unlink(`./public/profile_pictures/${userArr[0].profilePicturePath}`, err => {
    if (err) console.log(err);
    console.log(userArr[0].profilePicturePath + ' image is deleted');
  });
  sql = `UPDATE user SET profilePicturePath = ? WHERE id = ?`;
  db.run(sql, [`${req.file.filename}`, req.id], err => {
    if (err) return console.error(err.message);
  });
  return res.json({ ok: true, profilePicturePath: req.file.filename });
};

export { registerUser, loginUser, getUserId, getConversationId, logout, updateUser };
