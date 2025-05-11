import React from 'react';
import styles from './ProfileModal.module.css';
import avatar from '@/assets/img/avatar.svg';
import Modal from '@/shared/ui/modal/Modal';
import { ProfileModalProps } from '@/features/user-profile/model/types';

const ProfileModal: React.FC<ProfileModalProps> = ({
                                                       firstName,
                                                       lastName,
                                                       isLogoutModalOpen,
                                                       onProfileClick,
                                                       onLogoutClick,
                                                       onLogoutConfirm,
                                                       onLogoutCancel,
                                                   }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.name}>{lastName} {firstName}</div>
                <img src={avatar} alt="Аватар" className={styles.avatar} />
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
                primaryType="default"
                secondaryType="border"
                buttonSize="small"
            />
        </div>
    );
};

export default ProfileModal;
