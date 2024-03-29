import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Homepage from "./pages/Homepage"
import Navbar from './pages/Navbar'
import Challenges from './pages/Challenges'
import MembersResults from './pages/MembersResults'
import Coaches from './pages/Coaches'
import Profile from './pages/Profile'
import ErrorPage from './pages/ErrorPage'
import MyPlan from './pages/MyPlan'
import Tracking from './pages/Tracking'
import IsPrivate from './components/isPrivate'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Homepage />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/members-results" element={<MembersResults />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
        <Route path="/myplan" element={<IsPrivate><MyPlan /></IsPrivate>} />
        <Route path="/tracking" element={<IsPrivate><Tracking /></IsPrivate>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
