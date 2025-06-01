import React from 'react';
import styles from './EventContacts.module.css';
import UserCard from '@/components/user/user-card/UserCard';
import { useEventContacts } from '@/hooks/event/useEventContacts';
import { ProfileResponse } from '@/types';

interface EventContactsProps {
    eventId: string;
}

const EventContacts: React.FC<EventContactsProps> = ({ eventId }) => {
    const { contacts, isLoading, isError } = useEventContacts(eventId);

    if (!eventId) {
        return <p>Не передан ID события</p>;
    }

    return (
        <div className={styles.contacts}>
            <h4 className={styles.title}>Контакты</h4>

            {isLoading && <p>Загрузка контактов...</p>}
            {isError && <p>Ошибка при загрузке контактов</p>}

            {!isLoading && !isError && (
                <ul className={styles.list}>
                    {contacts.map((person: ProfileResponse, index: number) => (
                        <li key={person.id || index}>
                            <UserCard
                                name={person.name || person.email || 'Аноним'}
                                role={person.role|| 'Контакт'}
                                variant="contact"
                                avatarUrl={person.photoUrl}
                                eventId={eventId}
                                userId={person.id}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventContacts;
