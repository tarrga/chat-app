import { useRef, useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { setUsername } from '../store/userSlice';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

export default function Login() {
  const dispatch = useAppDispatch();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const rePassword = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<null | string>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit');

    e.preventDefault();
    setError(null);
    if (username.current?.value.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (password.current?.value.length < 3) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password.current?.value.length !== rePassword.current?.value) {
      setError('Password must match');
      return;
    }
    if (username.current?.value) {
      dispatch(setUsername(username.current?.value));
    }
  };
  return (
    <div className='flex flex-col justify-center items-center w-1/2 max-w-screen-sm p-16 bg-gray-600 fixed -translate-y-1/2 top-1/2 rounded-2xl shadow-xl shadow-gray-600'>
      <div className='flex flex-row items-center text-4xl'>
        <IoChatbubbleEllipsesOutline className='text-blue-400 text-5xl mr-2' />
        <span>Chat</span>
        <span className='text-blue-400'>App</span>
      </div>
      <form className='w-full flex flex-col justify-center items-center mt-12' onSubmit={submitHandler}>
        <input ref={username} className='w-full py-3 px-5 text-gray-800 bg-white shadow-md rounded-lg' type='text' placeholder='Username' />

        <input ref={password} className='w-full mt-4 py-3 px-5 text-gray-800 bg-white shadow-md rounded-lg' type='password' placeholder='Password' />
        <input ref={rePassword} className='w-full mt-4 py-3 px-5 text-gray-800 bg-white shadow-md rounded-lg' type='password' placeholder='Verify Password' />
        <input className='mt-4 bg-blue-600 w-full p-3 shadow-md rounded-lg' type='submit' value='Submit' />
        {error && <span className='text-red-500 mt-3 font-bold'>{error}</span>}
      </form>
    </div>
  );
}
