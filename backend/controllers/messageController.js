import { getConversationId } from './userController.js';
import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db = new sqlite3.cached.Database('./model/app.db', sqlite3.OPEN_READWRITE, err => {
  if (err) return console.error(err.message);
});
let sql;

const sendMessage = async (req, res) => {
  console.log(req.cookies.jwt);
  console.log(req.body);
  try {
    const { message, date } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.id;
    let sql;
    console.log(req.params.id, ' ', senderId);
    const conversationId = await getConversationId(receiverId, senderId);
    console.log(conversationId);
    if (conversationId.length > 0) {
      // add message
      console.log('there is a conversation');
      // insert message into message table
      sql = 'INSERT INTO message(text, senderId, receiverId, date, conversation_id) VALUES(?,?,?,?,?)';
      db.run(sql, [message, senderId, receiverId, date, conversationId[0]], err => {
        if (err) return console.error(err.message);
      });
    } else {
      // add new conversation
      console.log('new conversation was made');
      sql = 'INSERT INTO conversation(user1, user2 ) VALUES(?,?)';
      db.run(sql, [receiverId[0], senderId], err => {
        if (err) return console.error(err.message);
      });

      // insert message into message table
      sql = 'INSERT INTO message(text, senderId, receiverId, date, conversation_id) VALUES(?,?,?,?,?)';
      db.run(sql, [message, senderId, receiverId, date, conversationId[0]], err => {
        if (err) return console.error(err.message);
      });
    }
  } catch (error) {
    console.log('error in sendMessage controller: ', error.message);
    res.status(500).json({ error: 'internal server error' });
  }
};

export { sendMessage };
