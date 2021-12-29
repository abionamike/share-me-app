import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import { userInfo } from './utils/fetchUser';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo) navigate('/login');
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
