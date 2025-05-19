import React from 'react';
import { Event } from '@/types';
import unlockIcon from '@/assets/img/unlock.svg';
import locationIcon from '@/assets/img/location.svg';
import clockIcon from '@/assets/img/clock.svg';
import styles from './EventDetails.module.css';
import { formatDateToMonthDay, formatTime } from '@/utils/dateUtils';

const eventTypeMap: { [key: string]: string } = {
    open: 'Открытое',
    closed: 'Закрытое',
    private: 'Частное',
};

const EventDetails: React.FC<{ event: Event }> = ({ event }) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    return (
        <div className={styles.meta}>
            <div className={styles.item}>
                <img src={unlockIcon} alt="Тип события" className={styles.icon} />
                <span className={styles.text}>
                    {eventTypeMap[event?.eventType || ''] || 'Не указано'}
                </span>
            </div>
            <div className={styles.item}>
                <img src={locationIcon} alt="Место проведения" className={styles.icon} />
                <span className={styles.text}>{event.location}</span>
            </div>
            <div className={styles.item}>
                <img src={clockIcon} alt="Дата проведения" className={styles.icon} />
                <span className={styles.text}>
                    {formatDateToMonthDay(startDate)} {formatTime(startDate)} — {formatDateToMonthDay(endDate)} {formatTime(endDate)}
                </span>
            </div>
        </div>
    );
};

export default EventDetails;
