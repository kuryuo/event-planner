import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoginMutation, useRegisterMutation } from '@/services/api/auth/authApi';
import { useLazyGetProfileQuery } from '@/services/api/user/profileApi';

import { AppRoute } from '@/utils/const';
import { validateAuth } from '@/utils/validation/validateAuth';
import { authStorage } from '@/utils/localStorage/authStorage';
import { saveProfileToStorage } from '@/utils/localStorage/profileStorage';

import { setProfile } from '@/services/profile/profileSlice';
import { baseApi } from '@/services/api/baseApi';

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
