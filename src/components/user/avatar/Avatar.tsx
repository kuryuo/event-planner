import React, { useEffect, useRef, useState } from 'react';
import styles from './Avatar.module.css';
import editIcon from '@/assets/img/edit.svg';
import UserAvatar from '@/components/user/user-avatar/UserAvatar';

type ProfilePhotoProps = {
    title?: string;
    onFileChange?: (file: File) => void;
    avatarUrl?: string;
};

const Avatar: React.FC<ProfilePhotoProps> = ({ title, onFileChange, avatarUrl }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            onFileChange?.(file);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className={styles.root}>
            <p className={styles.title}>{title}</p>
            <div className={styles.avatarWrap}>
                <UserAvatar
                    avatarUrl={previewUrl || avatarUrl}
                    alt="Фото профиля"
                    className={styles.avatar}
                />
                <div className={styles.buttons}>
                    <button
                        className={styles.btn}
                        aria-label="Редактировать фото"
                        onClick={handleEditClick}
                    >
                        <img src={editIcon} alt="Редактировать" />
                    </button>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChangeInternal}
                />
            </div>
        </div>
    );
};

export default Avatar;
