import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import Avatar from '@/components/avatar/Avatar';
import FormButtons from '@/components/form-buttons/FormButtons';
import { useProfileForm } from '@/hooks';
import ProfileFormContainer from '@/components/profile-form/ProfileFormContainer';
import Notification from '@/components/notification/Notification';
import styles from './ProfilePage.module.css';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/utils/const';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit, notification, setNotification, handleFileChange, } =
        useProfileForm();

    return (
        <div className={styles.profilePage}>
            <Sidebar />
            <div className={styles.contentContainer}>
                <Header title="Мой профиль"  />

                <div className={styles.profileContent}>
                    <div className={styles.profileFormContainer}>
                        <ProfileFormContainer formData={formData} onChange={handleChange} />
                    </div>
                    <div className={styles.profilePhotoContainer}>
                        <Avatar
                            title="Аватар"
                            onFileChange={handleFileChange}
                            avatarUrl={formData.avatarUrl}
                        />
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
