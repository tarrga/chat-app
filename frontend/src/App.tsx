import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { useAppSelector } from './hooks/hooks';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';

function App() {
  const { username } = useAppSelector(state => state.user);
  function NoMatch() {
    return (
      <div style={{ padding: 20 }}>
        <h2>404: Page Not Found</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
    );
  }

  return (
    <div className='bg-gray-800 min-h-dvh flex justify-center flex-row mx-auto py-40 px-36'>
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
  );
}

export default App;
