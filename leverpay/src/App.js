import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './page/LandingPage/Landingpage';
import Loginpage from './page/LandingPage/Loginpage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Loginpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
