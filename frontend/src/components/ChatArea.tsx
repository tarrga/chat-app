import InputBar from './InputBar';
import { useAppSelector } from '../hooks/hooks';
import dayjs from 'dayjs';

export default function ChatArea() {
  const messages = useAppSelector(state => state.messages);
  const { userId } = useAppSelector(state => state.user);

  return (
    <div className=' w-2/3 bg-blue-400 bg-[url("/src/assets/images/bg.png")] p-10 flex flex-col justify-end'>
      <ul className='flex flex-col'>
        {messages.map((msg, idx) => (
          <li
            className={`text-gray-800 max-w-md mt-2 px-3 py-1 pb-6 rounded-xl relative bg-white flex min-w-16 ${
              userId === msg.receiverId ? 'self-end bg-green-400' : 'self-start'
            }`}
            key={idx}
          >
            {msg.message}
            <span className={`text-xs absolute right-3 bottom-1 ${userId === msg.receiverId ? 'text-white' : 'text-gray-500'}`}>
              {dayjs(msg.date).format('HH:mm')}
            </span>
          </li>
        ))}
      </ul>
      <InputBar></InputBar>
    </div>
  );
}
