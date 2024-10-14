import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setToken(token)
        } else {
            setIsAuthenticated(false);
        }
    }, []);


    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
