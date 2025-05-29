import React from 'react';
import styles from './EventContacts.module.css';
import UserCard from '@/components/user/user-card/UserCard';

const EventContacts: React.FC = () => {
    const contacts = [
        { name: 'Контакт 1', role: 'Роль' },
        { name: 'Контакт 2', role: 'Роль' },
    ];

    return (
        <div className={styles.contacts}>
            <h4 className={styles.title}>Контакты</h4>
            <ul className={styles.list}>
                {contacts.map((person, index) => (
                    <li key={index}>
                        <UserCard name={person.name} role={person.role} variant = 'contact'/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventContacts;
