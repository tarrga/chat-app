import { useState } from 'react';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
import { User } from '../types';

export default function Home() {
  const [receiver, setReceiver] = useState<User | null>(null);
  const onSetReceiver = (user: User) => {
    setReceiver(user);
  };
  return (
    <div className='flex w-full max-w-screen-xl justify-center flex-row mx-auto rounded-2xl overflow-hidden'>
      <Sidebar receiver={receiver} onSetReceiver={onSetReceiver} />
      <ChatArea receiver={receiver} />
    </div>
  );
}
