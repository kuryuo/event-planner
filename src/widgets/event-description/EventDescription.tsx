import React from 'react';
import styles from './EventDescription.module.css';

type Props = {
    text: string;
};

const EventDescription: React.FC<Props> = ({ text }) => {
    return (
        <div className={styles.descriptionBlock}>
            <h4 className={styles.title}>Описание мероприятия</h4>
            <p className={styles.text}>{text}</p>
        </div>
    );
};

export default EventDescription;
