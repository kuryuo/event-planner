import React from 'react';
import styles from '@/components/user-card/UserCard.module.css';
import avatar from '@/assets/img/avatar.svg';

interface Props {
    name: string;
    role?: string;
}

const ContactUserCard: React.FC<Props> = ({ name, role }) => {
    return (
        <div className={styles.card}>
            <img src={avatar} alt={name} className={styles.avatar} />
            <div className={styles.infoBlock}>
                <p className={styles.name}>{name}</p>
                {role && <p className={styles.role}>{role}</p>}
            </div>
        </div>
    );
};

export default ContactUserCard;
