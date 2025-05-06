import React from 'react';
import styles from './ContactsBlock.module.css';
import UserCard from '@/components/user-card/UserCard';

const ContactsBlock: React.FC = () => {
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
                        <UserCard name={person.name} role={person.role} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactsBlock;
