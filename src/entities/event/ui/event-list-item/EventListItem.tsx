import React from 'react';
import styles from './EventListItem.module.css';

type DayEventItemProps = {
    day: string;
    time: string;
    title: string;
    color?: string;
};

const EventListItem: React.FC<DayEventItemProps> = ({ day, time, title, color = '#a8d5a2' }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <div className={styles.left}>
                    <span className={styles.date}>{day}</span>
                    <div className={styles.timeBlock}>
                        <span className={styles.marker} style={{ backgroundColor: color }} />
                        <span className={styles.time}>{time}</span>
                    </div>
                </div>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.line} />
        </div>
    );
};

export default EventListItem;
