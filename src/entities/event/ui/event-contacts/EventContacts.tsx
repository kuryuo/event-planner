import React from 'react';
import styles from './EventContacts.module.css';
import UserCard from '@/entities/user/ui/user-card/UserCard';

const EventContacts: React.FC = () => {
    const contacts = [
        { name: 'Иванов Иван', role: 'Руководитель проекта' },
        { name: 'Петрова Мария', role: 'Координатор' },
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
