export type Message = { message: string; date: string; receiverId: number };
export type User = { username: string | null; id: number | null; receiverId: number | null };
export type Users = { users: User[] };
