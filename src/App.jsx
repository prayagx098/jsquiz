import { Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './components/LandingPage';
import Quizpage from './components/Quizpage';
import RulePage from './components/RulePage';


function App() {


  return (
    <>

    <Routes>
      <Route path="/" element={<LandingPage />} />  
      <Route path="confirm" element={<RulePage />} />
      <Route path="index" element={<Quizpage />} />
    </Routes>


    </>
  )
}

export default App
