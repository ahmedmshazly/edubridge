import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const register = async (name, email, password) => {
        setIsLoading(true);
        setError(null); // Reset error state before new request

        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json(); // Try to parse JSON regardless of response status
            if (!response.ok) {
                setIsLoading(false);
                // Set error from server response or default message
                setError(json.error || 'An error occurred during registration.');

            } else {
                // localStorage.setItem('user', JSON.stringify(json));
                // dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
            }
        } catch (err) {
            // Catch network errors or issues with the fetch request
            setIsLoading(false);
            setError('Failed to register. Please try again.');
        }
    };

    return { register, isLoading, error };
};
