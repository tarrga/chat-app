import { IoIosSearch } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useState } from 'react';
import { setReceiverId } from '../store/userSlice';

export default function Sidebar() {
  const { users } = useAppSelector(state => state.users);
  const { receiverId } = useAppSelector(state => state.user);
  console.log(receiverId);

  const [search, setSearch] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  return (
    <div className='w-1/3 text-3xl p-6 font-bold bg-gray-50'>
      <form className='relative'>
        <input
          onChange={e => setSearch(e.target.value)}
          className='shadow-md w-full px-4 py-2 rounded-full bg-gray-200 text-gray-900 text-lg font-normal'
          type='text'
        />
        <IoIosSearch className='absolute text-gray-400 text-2xl right-4 top-1/2 -translate-y-1/2' />
      </form>
      <ul className='mt-8'>
        {users.map(receiver => {
          if (!search) {
            return (
              <li
                onClick={() => dispatch(setReceiverId(receiver.id!))}
                key={receiver.username}
                className={`text-gray-900 shadow-md text-base font-normal px-6 py-4 cursor-pointer mt-3 rounded-xl ${
                  receiverId === receiver.id ? 'bg-orange-400' : 'bg-slate-200'
                }`}
              >
                {receiver.username}
              </li>
            );
          } else {
            if (receiver.username?.toLowerCase().includes(search.toLowerCase())) {
              return (
                <li
                  onClick={() => dispatch(setReceiverId(receiver.id!))}
                  key={receiver.username}
                  className={`text-gray-900 shadow-md text-base font-normal px-6 py-4 cursor-pointer mt-3 rounded-xl bg-slate-200 ${
                    receiverId === receiver.id ? 'bg-orange-400' : 'bg-slate-200'
                  }`}
                >
                  {receiver.username}
                </li>
              );
            }
          }
        })}
      </ul>
    </div>
  );
}
