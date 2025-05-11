import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { baseApi } from '@/shared/api/baseApi';
import { clearProfile } from '@/features/user-profile/model/profileSlice';
import { AppRoute } from '@/const';
import { RootState } from '@/app/store';
import { useLogoutMutation } from '@/shared/api/auth/authApi';

export const useProfileModal = (onClose: () => void) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { firstName, lastName } = useSelector((state: RootState) => state.profile);
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
