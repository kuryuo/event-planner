import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoginMutation, useRegisterMutation } from '@/shared/api/auth/authApi';
import { useLazyGetProfileQuery } from '@/shared/api/user/profileApi';

import { AppRoute } from '@/const';
import { validateAuth } from '@/shared/lib/validation/validateAuth';
import { authStorage } from '@/shared/lib/localStorage/authStorage';
import { saveProfileToStorage } from '@/shared/lib/localStorage/profileStorage';

import { setProfile } from '@/shared/model/store/profileSlice';
import { baseApi } from '@/shared/api/baseApi';

export function useAuth(mode: 'login' | 'register' | 'reset') {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fetchProfile] = useLazyGetProfileQuery();
    const [register, { isLoading: isRegistering }] = useRegisterMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();

    const isLoading = isRegistering || isLoggingIn;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNotification(null);

        const validationError = validateAuth(mode, email, password);
        if (validationError) {
            setNotification({ type: 'error', message: validationError });
            return;
        }

        try {
            const auth = mode === 'register' ? register : login;
            const { token } = await auth({ email, password }).unwrap();

            authStorage.setToken(token);
            dispatch(baseApi.util.resetApiState());

            const profile = await fetchProfile().unwrap();
            const normalized = {
                id: profile.id,
                firstName: profile.firstName ?? '',
                lastName: profile.lastName ?? '',
            };

            dispatch(setProfile(normalized));
            saveProfileToStorage(normalized);

            navigate(AppRoute.EVENT_LIST);
        } catch {
            setNotification({ type: 'error', message: 'Неверный email или пароль' });
        }
    };

    return {
        email,
        password,
        setEmail,
        setPassword,
        handleSubmit,
        isLoading,
        notification,
        setNotification,
    };
}
