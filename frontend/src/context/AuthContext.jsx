import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
    });

    // Add JWT to headers
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/users/me');
                    setUser(res.data);
                } catch (e) {
                    console.error("Session expired or invalid");
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (username, password) => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password'); // Required by OAuth2PasswordRequestForm

        const res = await api.post('/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        localStorage.setItem('token', res.data.access_token);

        // Fetch user data
        const userRes = await api.get('/users/me', {
            headers: { Authorization: `Bearer ${res.data.access_token}` }
        });
        setUser(userRes.data);
    };

    const register = async (username, email, password) => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('email', email);
        params.append('password', password);
        await api.post('/register', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, api }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
