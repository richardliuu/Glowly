import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/registerform.css";
import Loading from "./Loading.jsx";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

function LoginForm({ route, method }) {
    console.log('Route prop:', route);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            
            const payload = { username, password };
            console.log('Full request details:', {
                url: route,
                payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const res = await api.post(route, payload);
            console.log('Success response:', res.data);

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error('Error details:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                headers: error.response?.headers
            });
            
            const errorMessage = error.response?.data?.detail || 
                               error.response?.data?.error ||
                               "An error occurred. Please try again.";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />

            {loading && <Loading />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default LoginForm;
