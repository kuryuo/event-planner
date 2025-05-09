import React from 'react';
import styles from '../UserCard.module.css';
import avatar from '@/assets/img/avatar.svg';

interface ContactUserCardProps {
    name: string;
    role?: string;
}

const ContactUserCard: React.FC<ContactUserCardProps> = ({ name, role }) => {
    return (
        <div className={styles.card}>
            <img src={avatar} alt={name} className={styles.avatar} />
            <div className={styles.infoBlock}>
                <p className={styles.name}>{name}</p>
                {role && <p className={styles.role}>{role}</p>}
                <input type="checkbox" className={styles.contactCheckbox} />
            </div>
        </div>
    );
};

export default ContactUserCard;
