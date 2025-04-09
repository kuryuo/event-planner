import React from 'react';
import styles from './ProfilePhoto.module.css';
import avatar from '@/assets/img/avatar.svg';
import editIcon from '@/assets/img/edit.svg';
import deleteIcon from '@/assets/img/delete.svg';

const ProfilePhoto: React.FC = () => {
    return (
        <div className={styles.profilePhoto}>
            <p className={styles.title}>Фото профиля</p>
            <div className={styles.avatarContainer}>
                <img src={avatar} alt="Фото профиля" className={styles.avatar} />
                <div className={styles.iconButtons}>
                    <button className={styles.icon} aria-label="Редактировать фото">
                        <img src={editIcon} alt="Редактировать" className={styles.iconImage} />
                    </button>
                    <button className={styles.icon} aria-label="Удалить фото">
                        <img src={deleteIcon} alt="Удалить" className={styles.iconImage} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePhoto;
