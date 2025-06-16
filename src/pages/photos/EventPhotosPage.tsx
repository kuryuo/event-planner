import React, { useState } from 'react';
import styles from './EventPhotosPage.module.css';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Header from '@/components/layout/header/Header';
import CloseIcon from '@/assets/img/close.svg?react';
import Arrow from '@/assets/img/arrow.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEventLink } from '@/utils/navigation';
import { useCurrentProfile, useEventPhotos } from '@/hooks';
import {API_BASE_URL} from "@/utils/const";

const EventPhotosPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state?.eventId;
    const { photos, isLoading, isError } = useEventPhotos(eventId || '');
    const eventTitle = location.state?.eventTitle || 'Фотографии события';

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const responsiblePersonId = location.state?.responsiblePersonId;

    const currentUserId = useCurrentProfile().id;

    const handleBackClick = () => {
        navigate(getEventLink(eventId, responsiblePersonId, currentUserId));
    };

    const handlePhotoClick = (index: number) => {
        setSelectedIndex(index);
    };

    const handleClose = () => setSelectedIndex(null);
    const showModal = selectedIndex !== null;

    const showPrev = () => setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : prev));
    const showNext = () =>
        setSelectedIndex((prev) => (prev! < photos.length - 1 ? prev! + 1 : prev));

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title={eventTitle} />

                <div className={styles.back} onClick={handleBackClick}>
                    <img src={Arrow} className={styles.arrow} alt="Назад" />
                    <span>Все фотографии</span>
                </div>

                {isLoading && <p>Загрузка фотографий...</p>}
                {isError && <p>Ошибка при загрузке фотографий</p>}
                {!isLoading && !isError && (
                    <div className={styles.grid}>
                        {photos.map((src: string, i: number) => (
                            <img
                                key={i}
                                src={`${API_BASE_URL}${src}`}
                                alt={`Фото ${i + 1}`}
                                className={styles.photo}
                                onClick={() => handlePhotoClick(i)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <img
                            src={`${API_BASE_URL}${photos[selectedIndex!]}`}
                            alt={`Фото ${selectedIndex! + 1}`}
                            className={styles.modalImage}
                        />
                        <button onClick={handleClose}>
                            <CloseIcon className={styles.icon} />
                        </button>
                        {selectedIndex! > 0 && (
                            <button className={styles.prevButton} onClick={showPrev}>
                                &lt;
                            </button>
                        )}
                        {selectedIndex! < photos.length - 1 && (
                            <button className={styles.nextButton} onClick={showNext}>
                                &gt;
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventPhotosPage;
