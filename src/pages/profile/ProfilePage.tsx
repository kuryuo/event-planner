import React from 'react';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import ProfileForm from '@/features/edit-profile/ui/profile-form/ProfileForm';
import Avatar from '@/shared/ui/avatar/Avatar';
import FormButtons from '@/shared/ui/form-buttons/FormButtons';
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
                        <Avatar />
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
