export type Message = { text: string; user: string; date: Date };
export type MessageState = {
  user: string;
  messages: Message[];
};
export type User = { username: string | null; userId: string | null };
export type Users = { users: User[] };
