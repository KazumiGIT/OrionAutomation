import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('orion_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login - in a real app, verify with backend
        // For now, we simulate a successful login if we find a user in "db" (localStorage)
        // or just create a session for the demo

        // Simulating a "database" fetch from a separate storage key if we wanted multiple users,
        // but for this demo, we'll just simulate a successful login for any valid email format
        const mockUser = {
            name: 'Demo User',
            username: email.split('@')[0],
            email: email,
            avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}&backgroundColor=E6A520,7A4A00,FFF8E7`,
            currentPlan: null,
            joinDate: new Date().toLocaleDateString()
        };

        setUser(mockUser);
        localStorage.setItem('orion_user', JSON.stringify(mockUser));
        return true;
    };

    const signup = (name, email, password) => {
        const newUser = {
            name,
            username: email.split('@')[0],
            email,
            avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}&backgroundColor=E6A520,7A4A00,FFF8E7`,
            currentPlan: null,
            joinDate: new Date().toLocaleDateString()
        };

        setUser(newUser);
        localStorage.setItem('orion_user', JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('orion_user');
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('orion_user', JSON.stringify(updatedUser));
    };

    const purchasePlan = (plan) => {
        const updatedUser = {
            ...user,
            currentPlan: {
                ...plan,
                purchaseDate: new Date().toLocaleDateString()
            }
        };
        setUser(updatedUser);
        localStorage.setItem('orion_user', JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, login, signup, logout, updateProfile, purchasePlan, loading }}>
            {children}
        </UserContext.Provider>
    );
};
