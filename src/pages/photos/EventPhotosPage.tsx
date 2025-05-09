import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EventPhotosPage.module.css';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import { AppRoute } from '@/const.ts';
import CloseIcon from '@/assets/img/close.svg?react';
import Arrow from '@/assets/img/arrow.svg';

const EventPhotosPage: React.FC = () => {
    const navigate = useNavigate();

    const photos = Array(12)
        .fill(null)
        .map((_, i) => `https://picsum.photos/1920/1080?random=${i + 1}`);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleBackClick = () => {
        navigate(AppRoute.EVENT);
    };

    const handlePhotoClick = (index: number) => {
        setSelectedIndex(index);
    };

    const handleClose = () => setSelectedIndex(null);
    const showModal = selectedIndex !== null;

    const showPrev = () => setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : prev));
    const showNext = () => setSelectedIndex((prev) => (prev! < photos.length - 1 ? prev! + 1 : prev));

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Масленница 2025" />

                <div className={styles.back} onClick={handleBackClick}>
                    <img src={Arrow} className={styles.arrow} alt="Назад" />
                    <span>Все фотографии</span>
                </div>

                <div className={styles.grid}>
                    {photos.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Фото ${i + 1}`}
                            className={styles.photo}
                            onClick={() => handlePhotoClick(i)}
                        />
                    ))}
                </div>
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <img
                            src={photos[selectedIndex!]}
                            alt={`Фото ${selectedIndex! + 1}`}
                            className={styles.modalImage}
                        />
                        <button onClick={handleClose}>
                            <CloseIcon className={styles.icon} />
                        </button>
                        {selectedIndex! > 0 && (
                            <button className={styles.prevButton} onClick={showPrev}>&lt;</button>
                        )}
                        {selectedIndex! < photos.length - 1 && (
                            <button className={styles.nextButton} onClick={showNext}>&gt;</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventPhotosPage;
