import { Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './components/LandingPage';
import Quizpage from './components/Quizpage';
import RulePage from './components/RulePage';

import { HashRouter as Router } from 'react-router-dom';

function App() {


  return (
    <>

    <Router>
      <Route path="/" element={<LandingPage />} />  
      <Route path="confirm" element={<RulePage />} />
      <Route path="index" element={<Quizpage />} />
    </Router>


    </>
  )
}

export default App
