import React from 'react';
import styles from '@/components/user/user-card/UserCard.module.css';
import UserAvatar from '@/components/user/user-avatar/UserAvatar';

interface Props {
    name: string;
    role?: string;
    avatarUrl?: string;
}

const ContactUserCard: React.FC<Props> = ({ name, role, avatarUrl }) => {
    return (
        <div className={styles.card}>
            <UserAvatar avatarUrl={avatarUrl} alt={name} className={styles.avatar} />
            <div className={styles.infoBlock}>
                <p className={styles.name}>{name}</p>
                {role && <p className={styles.role}>{role}</p>}
            </div>
        </div>
    );
};

export default ContactUserCard;
