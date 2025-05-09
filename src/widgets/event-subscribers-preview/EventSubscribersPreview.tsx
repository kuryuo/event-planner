import React from 'react';
import styles from './EventSubscribersPreview.module.css';
import avatar from '@/assets/img/avatar.svg';

const EventSubscribersPreview: React.FC = () => {
    const participants = Array(10).fill(avatar); // больше 4-х

    return (
        <div className={styles.subscribers}>
            <p className={styles.title}>
                Подписчики
                <span className={styles.participantCount}>{participants.length}</span>
            </p>

            <div className={styles.avatars}>
                {participants.slice(0, 4).map((src, index) => (
                    <img key={index} src={src} alt="Участник" className={styles.avatar} />
                ))}
            </div>
        </div>
    );
};

export default EventSubscribersPreview;
