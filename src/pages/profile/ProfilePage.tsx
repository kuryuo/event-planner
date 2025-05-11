import React from 'react';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import Avatar from '@/shared/ui/avatar/Avatar';
import FormButtons from '@/shared/ui/form-buttons/FormButtons';
import { useProfileForm } from '@/features/user-profile/model/useProfileForm';
import ProfileFormContainer from '@/features/user-profile/ui/profile-form/ProfileFormContainer';
import Notification from '@/shared/ui/notification/Notification';
import styles from './ProfilePage.module.css';
import { useNavigate } from 'react-router-dom';
import {AppRoute} from "@/const";

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const {
        formData,
        handleChange,
        handleSubmit,
        notification,
        setNotification,
    } = useProfileForm();

    return (
        <div className={styles.profilePage}>
            <Sidebar />
            <div className={styles.contentContainer}>
                <Header title="Мой профиль" />

                <div className={styles.profileContent}>
                    <div className={styles.profileFormContainer}>
                        <ProfileFormContainer
                            formData={formData}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.profilePhotoContainer}>
                        <Avatar />
                    </div>
                </div>

                <div className={styles.formActionsContainer}>
                    <FormButtons
                        primaryText="Сохранить изменения"
                        secondaryText="Отмена"
                        onPrimaryClick={handleSubmit}
                        onSecondaryClick={() => navigate(AppRoute.CALENDAR)}
                    />
                </div>

                {notification && (
                    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
                        <Notification
                            message={notification.message}
                            type={notification.type}
                            onClose={() => setNotification(null)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
