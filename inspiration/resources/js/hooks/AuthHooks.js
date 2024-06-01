// src/hooks/AuthHooks.js
import { useMutation } from '@tanstack/react-query';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const useLogin = () => {
    const { setIsAuth } = useAuth();
    return useMutation(
        async ({ email, password }) => {
            const response = await axios.post('/api/login', { email, password });
            return response.data;
        },
        {
            onSuccess: (data) => {
                localStorage.setItem('auth_token', data.token);  // トークンをlocalStorageに保存
                setIsAuth(true);
                toast.success('Logged in successfully');
            },
            onError: () => {
                toast.error('Login failed. Please check your credentials and try again.');
            },
        }
    );
};

export { useLogin };
