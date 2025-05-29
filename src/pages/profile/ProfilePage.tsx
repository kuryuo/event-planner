import React from 'react';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Header from '@/components/layout/header/Header';
import Avatar from '@/components/user/avatar/Avatar';
import FormButtons from '@/components/ui/form-buttons/FormButtons';
import { useProfileForm } from '@/hooks';
import ProfileFormContainer from '@/components/user/profile-form/ProfileFormContainer';
import styles from './ProfilePage.module.css';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/utils/const';
import ErrorToast from '@/components/ui/notification/ErrorToast';

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
                    <ErrorToast
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
