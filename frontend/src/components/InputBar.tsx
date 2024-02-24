import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { addMessage, setUser } from '../store/messagesSlice';
import { io } from 'socket.io-client';
import { Message } from '../types';

const socket = io(import.meta.env.VITE_BACKEND_URI);

export default function InputBar() {
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.messages);

  useEffect(() => {
    const receiveMessage = (data: Message) => {
      dispatch(addMessage(data));
    };
    socket.on('receive_message', receiveMessage);
    return () => {
      socket.off();
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    const date = new Date();

    socket.emit('send_message', { text: message, user: socket.id, date });
    if (user === '') {
      dispatch(setUser(socket.id!));
    }
    dispatch(addMessage({ text: message, user: socket.id!, date }));
    setMessage('');
  };
  return (
    <form onSubmit={handleSubmit} className='relative mt-3'>
      <input
        onChange={e => setMessage(e.target.value)}
        value={message}
        type='text'
        className='w-full rounded-xl h-10 p-6 bg-white text-gray-800'
        placeholder='Message'
      />
      <input
        type='submit'
        value=''
        className='active:w-5 active:h-5 active:right-7 transition-all bg-cover bg-no-repeat bg-center w-6 h-6 cursor-pointer absolute right-6 top-1/2 -translate-y-1/2 bg-[url("/src/assets/images/icons/send-icon.png")]'
      />
    </form>
  );
}
