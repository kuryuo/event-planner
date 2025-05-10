import React, { useState } from 'react';
import styles from './ProfileModal.module.css';
import avatar from '@/assets/img/avatar.svg';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/const';
import Modal from '@/shared/ui/modal/Modal';
import { useLogoutMutation } from '@/shared/api/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/shared/api/baseApi';
import { clearProfile } from '@/shared/model/store/profileSlice';

type Props = {
    onClose: () => void;
};

const ProfileModal: React.FC<Props> = ({ onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { firstName, lastName } = useSelector((state: RootState) => state.profile);

    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [logout] = useLogoutMutation();

    const handleProfileClick = () => {
        navigate(AppRoute.PROFILE);
        onClose();
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

            console.log('[Logout] Пользователь успешно вышел из аккаунта');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={styles.overlay} >
            <div className={styles.modal}>
                <div className={styles.name}>{lastName} {firstName}</div>
                <div>
                    <img src={avatar} alt="Аватар" className={styles.avatar} />
                </div>
                <div className={styles.actions}>
                    <div className={styles.link} onClick={handleProfileClick}>
                        Перейти в профиль
                    </div>
                    <div
                        className={`${styles.link} ${styles.logout}`}
                        onClick={() => setLogoutModalOpen(true)}
                    >
                        Выйти из аккаунта
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
                title="Подтверждение выхода"
                description="Вы уверены, что хотите выйти?"
                primaryText="Выйти"
                secondaryText="Отмена"
                primaryType="default"
                secondaryType="border"
                buttonSize="small"
            />
        </div>
    );
};

export default ProfileModal;
