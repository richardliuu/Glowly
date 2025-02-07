import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

// Unfinished protected route 

function ProtectedRoute({children}) {
    const [isAuthorized, setisAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setisAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    }

}

export default ProtectedRoute;