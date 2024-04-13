import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    
    
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null); // Reset error state before new request

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json(); // Try to parse JSON regardless of response status
            console.log("response ok?", response.ok)
            if (!response.ok) {
                setIsLoading(false);
                // Set error from server response or default message
                setError(json.error || 'An error occurred during login.');

            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
            }
        } catch (err) {
            // Catch network errors or issues with the fetch request
            setIsLoading(false);
            setError('Failed to login. Please try again.');
        }
    };

    return { login, isLoading, error };
};
