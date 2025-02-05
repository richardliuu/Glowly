import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.jsx" 
import Loading from "../Loading.jsx/" 
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function LoginForm({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassowrd] = useState("");
    const [loading, setLoading] = useState(False);
    const navigate = useNavigate();

    const name = method === "login" ? "Login": "Register";
}



export default LoginForm