import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setUser } from '../store/userSlice';
import { addUsers } from '../store/usersSlice';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { Link, Navigate } from 'react-router-dom';
import { socket } from '../helper/socket';

export default function Login() {
  const dispatch = useAppDispatch();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<null | string>(null);
  const user = useAppSelector(state => state.user);
  const users = useAppSelector(state => state.users);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    // fetch
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.current?.value || 'luigi',
          password: password.current?.value || '123456',
        }),
      });
      const data = await res.json();
      console.log(data.users);
      console.log(data.user);

      if (data.error) {
        throw Error(data.error);
      }
      // console.log(socket.id);
      console.log(data.user);

      socket.emit('log_in', { username: data.user.username, id: data.user.id });

      dispatch(setUser(data.user));
      console.log(data.users);

      dispatch(addUsers(data.users));
      console.log(users);
    } catch (err) {
      setError(err?.message);
    }
  };
  return (
    <>
      {user.username && <Navigate to='/' replace={true} />}
      <div className='flex flex-col justify-center items-center w-1/2 max-w-screen-sm p-16 bg-gray-600 fixed -translate-y-1/2 top-1/2 rounded-2xl shadow-md shadow-gray-600'>
        <div className='flex flex-row items-center text-4xl'>
          <IoChatbubbleEllipsesOutline className='text-blue-400 text-5xl mr-2' />
          <span>Chat</span>
          <span className='text-blue-400'>App</span>
        </div>
        <form className='w-full flex flex-col justify-center items-center mt-12' onSubmit={submitHandler}>
          <input ref={username} className='w-full py-3 px-5 text-gray-800 bg-white shadow-md rounded-lg' type='text' placeholder='Username' />
          <input ref={password} className='w-full mt-4 py-3 px-5 text-gray-800 bg-white shadow-md rounded-lg' type='password' placeholder='Password' />
          <input className='mt-4 bg-blue-600 w-full p-3 shadow-md rounded-lg' type='submit' value='Log In' />
          {error && <span className='text-red-500 mt-3 font-bold'>{error}</span>}
        </form>
        <div className='font-bold mt-3'>
          Don't have an account?{' '}
          <Link className='text-blue-400' to='/sign-up'>
            Sign Up!
          </Link>
        </div>
      </div>
    </>
  );
}
