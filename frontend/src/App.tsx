import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { useAppSelector, useAppDispatch } from './hooks/hooks';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import { socket } from './helper/socket';
import { useEffect } from 'react';
import { activeUser } from './types';
import { Message } from './types';
import { addActiveProp } from './store/usersSlice';
import { addMessage } from './store/messagesSlice';

// const socket = io(`${import.meta.env.VITE_BACKEND_URI}`);

function App() {
  const { username } = useAppSelector(state => state.user);
  const users = useAppSelector(state => state.users);
  const { messages } = useAppSelector(state => state.messages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function refreshUsers(activeUsers: activeUser[]) {
      console.log(activeUsers);
      dispatch(addActiveProp(activeUsers));
    }
    const receiveMessage = (message: Message) => {
      dispatch(addMessage(message));
    };
    socket.on('refresh_users', refreshUsers);
    socket.on('receive_message', receiveMessage);

    return () => {
      console.log('exit');
      socket.off('refresh_users', refreshUsers);
      socket.off('receive_message', receiveMessage);
    };
  }, [dispatch]);

  function NoMatch() {
    return (
      <div style={{ padding: 20 }}>
        <h2>404: Page Not Found</h2>
      </div>
    );
  }

  return (
    <div className='h-screen bg-gray-800'>
      <div className='h-screen w-full max-h-1000 flex justify-center flex-row mx-auto py-24 px-36 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md overflow-hidden'>
        <Router>
          <Routes>
            <Route element={<ProtectedRoute user={username} redirectPath='/login' />}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
