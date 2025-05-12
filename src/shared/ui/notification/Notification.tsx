import React from 'react';
import styles from './Notification.module.css';
import Close from '@/assets/img/close.svg?react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    const containerClass =
        type === 'success'
            ? `${styles.container} ${styles.success}`
            : `${styles.container} ${styles.error}`;

    const closeIconClass =
        type === 'success'
            ? `${styles.closeIcon} ${styles.closeSuccess}`
            : `${styles.closeIcon} ${styles.closeError}`;

    return (
        <div className={containerClass}>
            <span className={styles.message}>{message}</span>
            <button onClick={onClose} className={styles.closeButton}>
                <Close className={closeIconClass} />
            </button>
        </div>
    );
};

export default Notification;
