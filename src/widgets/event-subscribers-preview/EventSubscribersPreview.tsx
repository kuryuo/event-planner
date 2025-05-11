import React from 'react';
import styles from './EventSubscribersPreview.module.css';
import avatar from '@/assets/img/avatar.svg';
import { useNavigate } from 'react-router-dom';
import {AppRoute} from "@/const";

const EventSubscribersPreview: React.FC = () => {
    const navigate = useNavigate();
    const participants = Array(10).fill(avatar);

    return (
        <div className={styles.subscribers}>
            <p className={styles.title} onClick={() => navigate(AppRoute.SUBSCRIBERS)}>
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
