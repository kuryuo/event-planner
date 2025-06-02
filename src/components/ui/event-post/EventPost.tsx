import React from 'react';
import styles from './EventPost.module.css';
import cat from '@/assets/img/cat.png';
import More from '@/assets/img/more.svg?react';

const EventPost: React.FC = () => {
    const notifications = [
        {
            title: 'Мероприятие',
            message:
                'Добрый день, уважаемые участники! Мы вас с таким нетерпением ждём, что наше мероприятие переносится на 2 часа. Время начала - 16:00',
            date: 'Дата/время',
        },
    ];

    return (
        <div className={styles.notifications}>
            <h4 className={styles.title}>Посты</h4>
            <ul className={styles.list}>
                {notifications.map((n, index) => (
                    <li key={index} className={styles.item}>
                        <More className={styles.more} />
                        <img src={cat} alt="Иконка" className={styles.icon} />
                        <div className={styles.content}>
                            <div className={styles.nameRow}>
                                <span className={styles.name}>{n.title}</span>
                            </div>
                            <p className={styles.text}>{n.message}</p>
                        </div>
                        <span className={styles.date}>{n.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventPost;
