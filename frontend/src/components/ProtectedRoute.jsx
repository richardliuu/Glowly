import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }

        try {
            const response = await api.post("/refresh-token", { refreshToken });
            const { accessToken } = response.data;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            setIsAuthorized(true);
        } catch (error) {
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>; // should use the loading.js files and such to display this 
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;