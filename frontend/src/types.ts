import { Socket } from 'socket.io-client';
export type Message = { message: string; date: string; receiverId: number; senderId: number };
export type User = { username: string | null; id: number | null; socketId: string | null; profilePicturePath: string | null };
export type activeUser = { username: string; socketId: string | null };
export type Users = User[];
export type SocketType = {
  socket: Socket;
};
