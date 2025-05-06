import React from 'react';
import styles from './UserCard.module.css';
import avatar from '@/assets/img/avatar.svg';

interface UserCardProps {
    name: string;
    role?: string;
    withCheckbox?: boolean;
    withMenu?: boolean;
    isContactMode?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
                                               name,
                                               role,
                                               withCheckbox = false,
                                               withMenu = false,
                                               isContactMode = false,
                                           }) => {
    return (
        <div className={styles.card}>
            <img src={avatar} alt={name} className={styles.avatar} />

            <div className={styles.infoBlock}>
                <div className={styles.headerRow}>
                    <p className={styles.name}>{name}</p>
                    {withMenu && <span className={styles.menu}>...</span>}
                </div>
                {role && <p className={styles.role}>{role}</p>}
                {withCheckbox && (
                    <label className={styles.checkboxRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span>Добавить в блок "Контакты"</span>
                    </label>
                )}
            </div>

            {isContactMode && (
                <input type="checkbox" className={styles.contactCheckbox} />
            )}
        </div>
    );
};

export default UserCard;
