import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import ProfileForm from '@/components/profile-form/ProfileForm';
import ProfilePhoto from '@/components/profile-photo/ProfilePhoto';
import FormButtons from '@/components/form-buttons/FormButtons';
import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
    return (
        <div className={styles.profilePage}>
            <Sidebar />
            <div className={styles.contentContainer}>
                    <Header title="Мой профиль" />

                <div className={styles.profileContent}>
                    <div className={styles.profileFormContainer}>
                        <ProfileForm />
                    </div>
                    <div className={styles.profilePhotoContainer}>
                        <ProfilePhoto />
                    </div>
                </div>

                <div className={styles.formActionsContainer}>
                    <FormButtons
                        primaryText="Сохранить изменения"
                        secondaryText="Отмена"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
