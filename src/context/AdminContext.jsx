import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
    adminLogin,
    clearAdminToken,
    getAdminToken,
    setAdminToken,
} from '../lib/api';

const AdminContext = createContext(null);

// Built-in admin. Backend will be checked first when reachable; this is the
// fallback so the CMS UI is always accessible.
const BUILTIN_USERNAME = 'Varakorn';
const BUILTIN_PASSWORD = 'admin123';

const isOfflineError = (err) => {
    if (!err) return false;
    if (err.status === 404 || err.status === 405) return true;       // no such endpoint
    if (err.status === undefined) return true;                       // network error
    if (err.status >= 500) return true;                              // backend broken
    return false;
};

export const useAdmin = () => {
    const ctx = useContext(AdminContext);
    if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
    return ctx;
};

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setIsAdmin(Boolean(getAdminToken()));
        setReady(true);
    }, []);

    const login = useCallback(async (username, password) => {
        // 1. Try the backend first — gives a real, durable session.
        try {
            const res = await adminLogin(username, password);
            if (res && res.token) {
                setAdminToken(res.token);
                setIsAdmin(true);
                return true;
            }
        } catch (err) {
            // If the backend explicitly rejected the credentials, surface that.
            if (err && err.status === 401) {
                throw new Error('Invalid username or password');
            }
            if (!isOfflineError(err)) {
                throw err;
            }
            // Backend offline / not deployed — fall through to built-in check.
        }

        // 2. Built-in credentials work when the backend is unreachable.
        if (username === BUILTIN_USERNAME && password === BUILTIN_PASSWORD) {
            setAdminToken(password);
            setIsAdmin(true);
            return true;
        }

        throw new Error('Invalid username or password');
    }, []);

    const logout = useCallback(() => {
        clearAdminToken();
        setIsAdmin(false);
    }, []);

    return (
        <AdminContext.Provider value={{ isAdmin, ready, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};
