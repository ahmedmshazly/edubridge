// src/hooks/useRedirectAuthenticated.jsimport { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';


export const useRedirectAuthenticated = (redirectTo = '/') => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectTo);
        }
    }, [isAuthenticated, navigate, redirectTo]);
};
