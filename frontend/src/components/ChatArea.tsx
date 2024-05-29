import InputBar from './InputBar';
import { useAppSelector } from '../hooks/hooks';
import dayjs from 'dayjs';
import { User } from '../types';

type props = {
  receiver: User | null;
};

export default function ChatArea({ receiver }: props) {
  const messages = useAppSelector(state => state.messages);
  const { id } = useAppSelector(state => state.user);

  return (
    <div className=' w-full bg-slate-400 bg-[url("/src/assets/images/bg.png")] p-10 flex flex-col justify-end'>
      <ul className='flex flex-col'>
        {messages.map((msg, idx) => {
          if (msg.receiverId === receiver?.id || msg.senderId === receiver?.id) {
            return (
              <li
                className={`text-gray-800 max-w-md mt-2 px-3 py-1 pb-6 rounded-xl relative bg-white flex min-w-16 ${
                  id === msg.receiverId ? 'self-end bg-slate-800 text-white' : 'self-start'
                }`}
                key={idx}
              >
                {msg.message}
                <span className={`text-xs absolute right-3 bottom-1 text-gray-500`}>{dayjs(msg.date).format('HH:mm')}</span>
              </li>
            );
          }
        })}
      </ul>
      {receiver && <InputBar receiver={receiver}></InputBar>}
    </div>
  );
}
