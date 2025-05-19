import React, { useRef } from 'react';
import { useClickOutside, useCurrentProfile, EventType } from '@/hooks';
import styles from './EventModal.module.css';
import { formatDateToMonthDay, formatTime } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { getEventLink } from '@/utils/navigation';

type EventModalProps = {
    events: EventType[];
    selectedDate: Date;
    onClose: () => void;
};

const EventModal: React.FC<EventModalProps> = ({ events, selectedDate, onClose }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, onClose);
    const navigate = useNavigate();
    const currentUserId = useCurrentProfile().id;

    const onEventClick = (eventId: string, responsiblePersonId: string) => {
        navigate(getEventLink(eventId, responsiblePersonId, currentUserId));
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.content} ref={modalRef}>
                <h3 className={styles.title}>События на {formatDateToMonthDay(selectedDate)}</h3>
                {events.length > 0 ? (
                    <ul>
                        {events.map((event) => (
                            <li
                                key={event.id}
                                className={styles.cards}
                                onClick={() => onEventClick(event.id, event.responsiblePersonId)}
                            >
                                <strong className={styles.name}>{event.title}</strong>
                                <div className={styles.datetime}>
                                    Дата: {formatDateToMonthDay(event.start)} -{' '}
                                    {formatDateToMonthDay(event.end)}
                                </div>
                                <div className={styles.datetime}>
                                    Время: {formatTime(event.start)} - {formatTime(event.end)}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Нет событий на эту дату.</p>
                )}
            </div>
        </div>
    );
};

export default EventModal;
