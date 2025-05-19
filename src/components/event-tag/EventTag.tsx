import React from 'react';
import styles from './EventTag.module.css';

interface Props {
    text: string;
}

const EventTag: React.FC<Props> = ({ text }) => {
    return (
        <div className={styles.tag}>
            <span className={styles.label}>{text}</span>
        </div>
    );
};

export default EventTag;
