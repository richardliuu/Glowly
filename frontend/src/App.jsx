import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

// Components
import Login from './components/Login'
import Register from './components/Register'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordReset from './components/PasswordReset'
import Home from './components/Home'
import About from './components/About'
import Posts from './components/Posts'
import CreatePost from './components/CreatePosts'
import Support from './components/Support'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoutes'
import Chat from './components/Chat'
import MapPage from './components/MapPage'

function App() {
  const location = useLocation()
  // Simplified path check using startsWith and includes
  const noNavbar = location.pathname === "/" || 
                   location.pathname === "/register" || 
                   location.pathname.includes("password")

  // Define routes that don't need the navbar
  const publicRoutes = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/request/password_reset" element={<PasswordResetRequest />} />
      <Route path="/password-reset/:token" element={<PasswordReset />} />
    </Routes>
  )

  // Define routes that need the navbar and protection
  const protectedRoutes = (
    <Routes>
      <Route element={<ProtectedRoute />}> 
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/support" element={<Support />} />
        <Route path="/chat/:roomName" element={<Chat />} />
        <Route path="map" element={<MapPage />}/>
      </Route>
    </Routes>
  )

  return noNavbar ? publicRoutes : <Navbar content={protectedRoutes} />
}

export default App