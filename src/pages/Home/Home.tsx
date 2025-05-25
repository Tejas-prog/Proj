import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="box">
    <div className="home-container">
      <h3>Choose an Option</h3>
      <div className="button-group">
        <button className="btn-chatbot" onClick={() => navigate('/chatbot')}>Chatbot</button>
        <button className="btn-image" onClick={() => navigate('/image')}>Image Based</button>
      </div>
    </div>
    </div>
  );
};

export default Home;
