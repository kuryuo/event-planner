import React from 'react';
import styles from './EventsToolbar.module.css';
import calendarIcon from '@/assets/img/calendar2.svg';
import listIcon from '@/assets/img/list.svg';

const EventsToolbar: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <button className={styles.arrow}>&lt;</button>
                <span className={styles.month}>Март <span className={styles.year}>2025</span></span>
                <button className={styles.arrow}>&gt;</button>
            </div>

            <div className={styles.right}>
                <button className={styles.iconButton}>
                    <img src={calendarIcon} alt="Календарь" />
                </button>
                <button className={styles.iconButton}>
                    <img src={listIcon} alt="Список" />
                </button>
            </div>
        </div>
    );
};

export default EventsToolbar;
