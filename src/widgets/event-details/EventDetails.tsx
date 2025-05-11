import React from 'react';
import styles from './EventDetails.module.css';
import unlockIcon from '@/assets/img/unlock.svg';
import locationIcon from '@/assets/img/location.svg';
import clockIcon from '@/assets/img/clock.svg';

interface EventDetailsProps {
    eventType: string;
    location: string;
    startDate: string;
    endDate: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventType, location, startDate, endDate }) => {
    return (
        <div className={styles.meta}>
            <div className={styles.item}>
                <img src={unlockIcon} alt="Тип события" className={styles.icon} />
                <span className={styles.text}>{eventType}</span>
            </div>
            <div className={styles.item}>
                <img src={locationIcon} alt="Место проведения" className={styles.icon} />
                <span className={styles.text}>{location}</span>
            </div>
            <div className={styles.item}>
                <img src={clockIcon} alt="Дата проведения" className={styles.icon} />
                <span className={styles.text}>{startDate} — {endDate}</span>
            </div>
        </div>
    );
};

export default EventDetails;
