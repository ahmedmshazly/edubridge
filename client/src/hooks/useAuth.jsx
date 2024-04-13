// src/hooks/useAuth.js
// This hook centralizes authentication logic
export const useAuth = () => {
    const user = localStorage.getItem('user');
    return { isAuthenticated: !!user };
};