import React, { useRef } from 'react';
import { EventType } from '../model/useCalendar';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import styles from './EventModal.module.css';
import { formatDateToMonthDay, formatTime } from '@/shared/lib/dateUtils';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from "@/const";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

type EventModalProps = {
    events: EventType[];
    selectedDate: Date;
    onClose: () => void;
};

const EventModal: React.FC<EventModalProps> = ({ events, selectedDate, onClose }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, onClose);

    const navigate = useNavigate();

    const currentUserId = useSelector((state: RootState) => state.profile.id);

    const onEventClick = (eventId: string, responsiblePersonId: string) => {
        const mode = responsiblePersonId === currentUserId ? 'organizer' : 'participant';

        const eventLink = `${AppRoute.EVENT.replace(':eventId', eventId)}?mode=${mode}`;

        navigate(eventLink);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.content} ref={modalRef}>
                <h3 className={styles.title}>
                    События на {formatDateToMonthDay(selectedDate)}
                </h3>
                {events.length > 0 ? (
                    <ul>
                        {events.map((event) => (
                            <li
                                key={event.id}
                                className={styles.cards}
                                onClick={() => onEventClick(event.id, event.responsiblePersonId)}
                            >
                                <strong className={styles.name}>{event.title}</strong>
                                <div className={styles.datetime}>Дата: {formatDateToMonthDay(event.start)} - {formatDateToMonthDay(event.end)}</div>
                                <div className={styles.datetime}>Время: {formatTime(event.start)} - {formatTime(event.end)}</div>
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
