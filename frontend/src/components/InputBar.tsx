import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { addMessage } from '../store/messagesSlice';
import { io } from 'socket.io-client';
import { Message, User } from '../types';
import { socket } from '../helper/socket';

type props = {
  receiver: User | null;
};

export default function InputBar({ receiver }: props) {
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const { id } = useAppSelector(state => state.user);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const onEnterHandle = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      console.log('enter pressed');
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if message is empty
    if (!message) return;

    // if receiver is online
    if (receiver) {
      socket.emit('send_message', {
        message: message,
        receiverSocketId: receiver.socketId,
        receiverId: receiver.id,
        senderId: id,
        date: new Date().toISOString(),
      });
    }

    // try {
    //   const res = await fetch(`api/message/send/${receiverId}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       message,
    //       date: new Date(),
    //     }),
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log(error.message);
    // }

    // dispatch(addMessage({ message: message, date: new Date().toISOString(), receiverId: receiverId! }));
    setMessage('');
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ height: textArea.current?.scrollHeight }}
      className='relative mt-3 min-h-12 h-12 max-h-20 rounded-xl bg-white py-2 px-6 pr-16 overflow-hidden shadow-md shadow-gray-600'
    >
      <textarea
        onKeyUp={onEnterHandle}
        ref={textArea}
        style={{ scrollbarWidth: 'none' }}
        onChange={e => setMessage(e.target.value)}
        value={message}
        className='w-full bg-white h-full pt-1 text-gray-800 focus:outline-none resize-none'
        placeholder='Message'
      />
      <button
        type='submit'
        className='active:w-5 active:h-5 active:right-7 transition-all bg-cover bg-no-repeat bg-center w-6 h-6 cursor-pointer absolute right-6 top-1/2 -translate-y-1/2 translate-x-0 bg-[url("/src/assets/images/icons/send-icon.png")]'
      />
    </form>
  );
}
