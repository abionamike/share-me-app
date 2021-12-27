import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
    // <h1 className="text-3xl font-bold">
    //   Hello world!
    // </h1>
  );
}

export default App;
