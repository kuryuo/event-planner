import React from 'react';
import styles from './ProfilePhoto.module.css';
import avatar from '@/assets/img/avatar.svg';
import editIcon from '@/assets/img/edit.svg';
import deleteIcon from '@/assets/img/delete.svg';

const ProfilePhoto: React.FC = () => {
    return (
        <div className={styles.root}>
            <p className={styles.title}>Фото профиля</p>
            <div className={styles.avatarWrap}>
                <img src={avatar} alt="Фото профиля" className={styles.avatar} />
                <div className={styles.buttons}>
                    <button className={styles.btn} aria-label="Редактировать фото">
                        <img src={editIcon} alt="Редактировать" />
                    </button>
                    <button className={styles.btn} aria-label="Удалить фото">
                        <img src={deleteIcon} alt="Удалить" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePhoto;
