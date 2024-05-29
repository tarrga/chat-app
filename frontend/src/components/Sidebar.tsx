import { IoIosSearch } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useState } from 'react';
import { User } from '../types';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/usersSlice';
import { FaUserCircle } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import axios from 'axios';
import { updateProfilePicturePath } from '../store/userSlice';

type props = {
  receiver: User | null;
  onSetReceiver: (user: User) => void;
};

export default function Sidebar({ onSetReceiver, receiver }: props) {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const { username, profilePicturePath } = useAppSelector(state => state.user);
  const [search, setSearch] = useState<string>('');

  const uploadPorfilePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      formData.append('file', e.target.files![0]);
      const res = await axios.post('/api/users/update', formData);
      console.log(res);

      if (res.data.ok) {
        console.log('users profile photo updated');
        dispatch(updateProfilePicturePath(res.data.profilePicturePath));
      }
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className='flex flex-row'>
      <div className='min-w-20 bg-slate-400'></div>
      <div className='w-full border-r border-gray-400 min-w-72 text-3xl p-6 font-bold bg-gray-50'>
        <div className='flex text-slate-900 justify-between items-center mt-4'>
          <h2 className=''>{username}</h2>
          <div className='group text-slate-400 hover:opacity-80 relative transition-all border-2 border-slate-500 border-solid rounded-full p-0.5'>
            <input type='file' id='file' onChange={uploadPorfilePhoto} className='absolute left-0 top-0 w-8 h-8 cursor-pointer hidden' />
            <label htmlFor='file' className='w-16 h-16 block'>
              {' '}
              {profilePicturePath ? (
                <img src={`http://localhost:3000/${profilePicturePath}`} alt='' className='max-w-full max-h-full m-auto cursor-pointer rounded-full ' />
              ) : (
                <FaUserCircle className='cursor-pointer size-12' />
              )}
              <CiEdit className='group-hover:opacity-100 opacity-0 absolute bottom-5 right-1 translate-x-full translate-y-full  text-slate-700 cursor-pointer transition-all' />
            </label>
          </div>
        </div>
        <form className='relative mt-10'>
          <input
            placeholder='Search user'
            onChange={e => setSearch(e.target.value)}
            className='shadow-md w-full px-4 py-2 rounded-full bg-gray-200 text-gray-900 text-lg font-normal'
            type='text'
          />
          <IoIosSearch className='absolute text-gray-400 text-2xl right-4 top-1/2 -translate-y-1/2' />
        </form>
        <ul className='mt-8'>
          {users.map(user => {
            if (user.username?.toLowerCase().includes(search.toLowerCase())) {
              console.log(user);

              return (
                <li
                  onClick={() => onSetReceiver(user)}
                  key={user.username}
                  className={`text-gray-900 font-bold relative shadow-md text-base px-6 py-4 cursor-pointer mt-3 rounded-xl bg-slate-200 hover:bg-slate-500 hover:text-white ${
                    receiver?.id === user.id ? 'bg-slate-700 text-white hover:bg-slate-700' : 'bg-slate-100'
                  }`}
                >
                  {user.username}
                  <span
                    className={`rounded-full w-3 h-3 block absolute right-4 top-1/2 -translate-y-1/2
                    ${user.socketId ? 'bg-green-500 ' : 'bg-gray-400'}`}
                  ></span>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
