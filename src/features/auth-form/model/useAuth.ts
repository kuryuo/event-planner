import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '@/shared/api/authApi';
import { AppRoute } from '@/const';
import { validateAuth } from '@/shared/lib/validation/validateAuth';
import { authStorage } from '@/shared/lib/authStorage';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/shared/api/baseApi'
import { useLazyGetProfileQuery } from '@/shared/api/profileApi';
import { setProfile } from '@/shared/model/store/profileSlice';

export function useAuth(mode: 'login' | 'register' | 'reset') {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const [fetchProfile] = useLazyGetProfileQuery();

    const [register, { isLoading: isRegistering }] = useRegisterMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();
    const navigate = useNavigate();

    const isLoading = isRegistering || isLoggingIn;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const validationError = validateAuth(mode, email, password);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            if (mode === 'register') {
                const response = await register({ email, password }).unwrap();
                authStorage.setToken(response.token);
                dispatch(baseApi.util.resetApiState());

                const profile = await fetchProfile().unwrap();
                dispatch(setProfile({
                    firstName: profile.firstName || '',
                    lastName: profile.lastName || '',
                }));

                navigate(AppRoute.EVENT_LIST);

            } else if (mode === 'login') {
                const response = await login({ email, password }).unwrap();
                authStorage.setToken(response.token);
                dispatch(baseApi.util.resetApiState());

                const profile = await fetchProfile().unwrap();
                dispatch(setProfile({
                    firstName: profile.firstName || '',
                    lastName: profile.lastName || '',
                }));

                navigate(AppRoute.EVENT_LIST);
            } else {
                // сброс пароля
            }
        } catch {
            setError('Неверный email или пароль');
        }
    };

    return {
        email,
        password,
        setEmail,
        setPassword,
        handleSubmit,
        error,
        isLoading,
    };
}
