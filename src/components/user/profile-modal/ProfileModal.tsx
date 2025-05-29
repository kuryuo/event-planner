import React from 'react';
import styles from './ProfileModal.module.css';
import Modal from '@/components/ui/modal/Modal';
import { ProfileModalProps } from '@/types';
import { useCurrentProfile } from '@/hooks';
import UserAvatar from '@/components/user/user-avatar/UserAvatar';

const ProfileModal: React.FC<ProfileModalProps> = ({
                                                       firstName,
                                                       lastName,
                                                       isLogoutModalOpen,
                                                       onProfileClick,
                                                       onLogoutClick,
                                                       onLogoutConfirm,
                                                       onLogoutCancel,
                                                   }) => {
    const { avatarUrl } = useCurrentProfile();
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.name}>{lastName} {firstName}</div>
                <UserAvatar avatarUrl={avatarUrl} alt="Аватар" className={styles.avatar} />
                <div className={styles.actions}>
                    <div className={styles.link} onClick={onProfileClick}>
                        Перейти в профиль
                    </div>
                    <div className={`${styles.link} ${styles.logout}`} onClick={onLogoutClick}>
                        Выйти из аккаунта
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={onLogoutCancel}
                onConfirm={onLogoutConfirm}
                title="Подтверждение выхода"
                description="Вы уверены, что хотите выйти?"
                primaryText="Выйти"
                secondaryText="Отмена"
                primaryType="grey"
                secondaryType="border"
                buttonSize="small"
            />
        </div>
    );
};

export default ProfileModal;
