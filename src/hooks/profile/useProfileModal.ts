import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/services/api/baseApi';
import { clearProfile } from '@/services/profile/profileSlice';
import { AppRoute } from '@/utils/const';
import { useLogoutMutation } from '@/services/api/auth/authApi';
import { useCurrentProfile } from '@/hooks';

export const useProfileModal = (onClose: () => void) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { firstName, lastName } = useCurrentProfile();

    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [logout] = useLogoutMutation();

    const handleProfileClick = () => {
        navigate(AppRoute.PROFILE);
        onClose();
    };

    const handleLogoutClick = () => {
        setLogoutModalOpen(true);
    };

    const handleLogoutCancel = () => {
        setLogoutModalOpen(false);
    };

    const handleLogoutConfirm = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            dispatch(clearProfile());
            dispatch(baseApi.util.resetApiState());
            setLogoutModalOpen(false);
            onClose();
            navigate(AppRoute.AUTH);
        } catch (e) {
            console.error('Ошибка при выходе:', e);
        }
    };

    return {
        firstName,
        lastName,
        isLogoutModalOpen,
        handleProfileClick,
        handleLogoutClick,
        handleLogoutCancel,
        handleLogoutConfirm,
    };
};
