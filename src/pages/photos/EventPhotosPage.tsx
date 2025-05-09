import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EventPhotosPage.module.css';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import { AppRoute } from '@/const.ts';

const EventPhotosPage: React.FC = () => {
    const navigate = useNavigate();

    const photos = Array(12)
        .fill(null)
        .map((_, i) => `https://picsum.photos/350/250?random=${i + 1}`);

    const handleBackClick = () => {
        navigate(AppRoute.EVENT);
    };

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Масленница 2025" />

                <div className={styles.back} onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                    &lt; Все фотографии
                </div>

                <div className={styles.grid}>
                    {photos.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Фото ${i + 1}`}
                            className={styles.photo}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventPhotosPage;
