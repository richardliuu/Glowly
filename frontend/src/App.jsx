import react from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import NotFound from "./pages/notfound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Chat from "./components/Chat.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"


function Logout() {
  localStorage.clear() 
  return <Navigate to="/login" />
}

function Register() {
  localStorage.clear()
  return <Register />
}

function Chat() {

}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}



export default App
