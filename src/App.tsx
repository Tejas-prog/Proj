import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Chatbot from './pages/Chatbot/Chatbot';
import ImageUpload from './pages/Image1/ImageUpload';
import Helper from './pages/Chatbot/Helper';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path='/image' element={<ImageUpload/>} />
      <Route path='/helper' element={<Helper sowingDate={""} />} />
    </Routes>
  );
}

export default App;
