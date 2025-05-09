import React from 'react';
import styles from './EventTag.module.css';

interface EventTagProps {
    text: string;
}

const EventTag: React.FC<EventTagProps> = ({ text }) => {
    return (
        <div className={styles.tag}>
            <span className={styles.label}>{text}</span>
        </div>
    );
};

export default EventTag;
