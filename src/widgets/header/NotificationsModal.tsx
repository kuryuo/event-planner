import React, { useRef } from 'react';
import styles from './NotificationsModal.module.css';
import CloseIcon from '@/assets/img/close.svg?react';
import avatar from '@/assets/img/avatar.svg';

type Notification = {
    id: number;
    title: string;
    message: string;
    avatar?: string;
};

type Props = {
    onClose: () => void;
};

const notifications: Notification[] = [
    {
        id: 1,
        title: 'Иванов И.И.',
        message: 'Новое сообщение в чате “Работа”',
        avatar,
    },
    {
        id: 2,
        title: 'Системное уведомление',
        message: 'Вы поменяли пароль от аккаунта',
        avatar,
    },
    {
        id: 3,
        title: 'Системное уведомление',
        message: 'Новое мероприятие',
        avatar,
    },
    {
        id: 4,
        title: 'Иванов И.И.',
        message: 'Новое сообщение',
        avatar,
    },
];

const NotificationsModal: React.FC<Props> = ({ onClose }) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} ref={ref}>
                <div className={styles.header}>
                    <h2 className={styles.modalTitle}>Уведомления</h2>
                    <button className={styles.close} onClick={onClose}>
                        <CloseIcon className={styles.close} />
                    </button>
                </div>

                <div className={styles.content}>
                    {notifications.map((n) => (
                        <div key={n.id} className={styles.item}>
                            <img src={n.avatar} alt="" className={styles.avatar} />
                            <div>
                                <div className={styles.title}>{n.title}</div>
                                <div className={styles.message}>{n.message}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationsModal;
