import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PhotoGalleryPreview.module.css';
import { AppRoute } from '@/const.ts';

const PhotoGalleryPreview: React.FC = () => {
    const navigate = useNavigate();

    const photos = Array(10)
        .fill(null)
        .map((_, i) => `https://picsum.photos/200/150?random=${i + 1}`);

    const handleShowAllClick = () => {
        navigate(AppRoute.PHOTOS_EVENT);
    };

    return (
        <div className={styles.gallery}>
            <h4 className={styles.title}>Фотографии</h4>

            <div className={styles.row}>
                {photos.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Фото ${index + 1}`}
                        className={styles.image}
                    />
                ))}
            </div>

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

export default PhotoGalleryPreview;
