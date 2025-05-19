import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EventPhotosPreview.module.css';
import { AppRoute } from '@/utils/const.ts';
import { useEventPhotos } from '@/hooks/useEventPhotos';

type Props = {
    eventId: string;
    responsiblePersonId: string;
};

const EventPhotosPreview: React.FC<Props> = ({ eventId, responsiblePersonId }) => {
    const navigate = useNavigate();
    const { photos, isLoading, isError } = useEventPhotos(eventId);
    const BASE_URL = 'http://95.82.231.190:5002';

    const handleShowAllClick = () => {
        navigate(AppRoute.PHOTOS_EVENT, {
            state: {
                eventId,
                responsiblePersonId,
            },
        });
    };

    return (
        <div className={styles.gallery}>
            <h4 className={styles.title}>Фотографии</h4>

            {isLoading && <p>Загрузка...</p>}
            {!isLoading && !isError && (
                <div className={styles.row}>
                    {photos.slice(0, 5).map((src: string, index: number) => (
                        <img
                            key={index}
                            src={`${BASE_URL}${src}`}
                            alt={`Фото ${index + 1}`}
                            className={styles.image}
                        />
                    ))}
                </div>
            )}

            <div className={styles.footer}>
                <span
                    className={styles.showAll}
                    onClick={handleShowAllClick}
                    style={{ cursor: 'pointer' }}
                >
                    Показать все ({photos.length})
                </span>
            </div>
        </div>
    );
};

export default EventPhotosPreview;
