import React from 'react';
import styles from './EventDetails.module.css';
import unlockIcon from '@/assets/img/unlock.svg';
import locationIcon from '@/assets/img/location.svg';
import clockIcon from '@/assets/img/clock.svg';

const EventDetails: React.FC = () => {
    return (
        <div className={styles.meta}>
            <div className={styles.item}>
                <img src={unlockIcon} alt="Тип события" className={styles.icon} />
                <span className={styles.text}>Открытое</span>
            </div>
            <div className={styles.item}>
                <img src={locationIcon} alt="Место проведения" className={styles.icon} />
                <span className={styles.text}>Екатеринбург(Мира 32, коворкинг Р-044)</span>
            </div>
            <div className={styles.item}>
                <img src={clockIcon} alt="Дата проведения" className={styles.icon} />
                <span className={styles.text}>14 июня в 14:00 — 28 июля в 1:00</span>
            </div>
        </div>
    );
};

export default EventDetails;
