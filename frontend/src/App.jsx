import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';


import Login from './components/Login';
import Register from './components/Register';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordReset from './components/PasswordReset';
import Home from './components/Home';
import About from './components/About';
import Posts from './components/Posts';
import CreatePost from './components/CreatePosts';
import Support from './components/Support';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoutes';
import Chat from './components/Chat';
import Chatbot from './components/Chatbot';
import MapPage from './components/MapPage';

function App() {
  const location = useLocation();

  
  const noNavbar = location.pathname === "/" || 
                   location.pathname === "/register" || 
                   location.pathname.includes("password");


  const publicRoutes = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/request/password_reset" element={<PasswordResetRequest />} />
      <Route path="/password-reset/:token" element={<PasswordReset />} />
    </Routes>
  );


  const protectedRoutes = (
    <Routes>
      <Route element={<ProtectedRoute />}> 
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/support" element={<Support />} />
        <Route path="/chat/:roomName" element={<Chat />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Route>
    </Routes>
  );

  return noNavbar ? publicRoutes : <Navbar content={protectedRoutes} />;
}

export default App;
