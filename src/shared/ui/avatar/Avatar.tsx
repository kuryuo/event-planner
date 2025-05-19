import React from 'react';
import styles from './Avatar.module.css';
import avatar from '@/assets/img/avatar.svg';
import editIcon from '@/assets/img/edit.svg';

type ProfilePhotoProps = {
    title?: string;
};

const Avatar: React.FC<ProfilePhotoProps> = ({ title }) => {
    return (
        <div className={styles.root}>
            <p className={styles.title}>{title}</p>
            <div className={styles.avatarWrap}>
                <img src={avatar} alt="Фото профиля" className={styles.avatar} />
                <div className={styles.buttons}>
                    <button className={styles.btn} aria-label="Редактировать фото">
                        <img src={editIcon} alt="Редактировать" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
