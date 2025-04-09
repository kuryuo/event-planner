import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import ProfileForm from '@/components/profile-form/ProfileForm';
import ProfilePhoto from '@/components/profile-photo/ProfilePhoto';
import FormActions from '@/components/form-actions/FormActions';
import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
    return (
        <div className={styles.profilePage}>
            <Sidebar />
            <div className={styles.contentContainer}>
                <div className={styles.headerContainer}>
                    <Header title="Мой профиль" />
                </div>

                <div className={styles.profileContent}>
                    <div className={styles.profileFormContainer}>
                        <ProfileForm />
                    </div>
                    <div className={styles.profilePhotoContainer}>
                        <ProfilePhoto />
                    </div>
                </div>

                <div className={styles.formActionsContainer}>
                    <FormActions />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
