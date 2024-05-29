import { useRef, useState } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { Link, Navigate } from 'react-router-dom';

export default function Login() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const rePassword = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<null | string>(null);
  const user = useAppSelector(state => state.user);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    console.log(`${import.meta.env.VITE_BACKEND_URI}/users/register`);

    // if (username.current?.value.length < 3) {
    //   setError('Username must be at least 3 characters');
    //   return;
    // }
    // if (password.current?.value.length < 8) {
    //   setError('Password must be at least 8 characters');
    //   return;
    // }
    // if (password.current?.value !== rePassword.current?.value) {
    //   setError('Passwords do not match');
    //   return;
    // }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/users/register`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.current?.value,
          password: password.current?.value,
          rePassword: rePassword.current?.value,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw Error(data.error);
      }
    } catch (err) {
      setError(err.message);
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
          <input ref={rePassword} className='w-full mt-4 py-3 px-5 text-gray-800 bg-white shadow-md rounded-lg' type='password' placeholder='Verify Password' />
          <input className='mt-4 bg-blue-600 w-full p-3 shadow-md rounded-lg' type='submit' value='Sign Up' />
          {error && <span className='text-red-500 mt-3 font-bold'>{error}</span>}
        </form>
        <div className='font-bold mt-3'>
          Already have an account?{' '}
          <Link className='text-blue-400' to='/login'>
            Log In!
          </Link>
        </div>
      </div>
    </>
  );
}
