import React from 'react';
import styles from '@/components/user/user-card/UserCard.module.css';
import UserAvatar from "@/components/user/user-avatar/UserAvatar";

interface Props {
    name: string;
    checked?: boolean;
    onToggle?: (checked: boolean) => void;
    avatarUrl?: string;
}

const CheckboxOnlyUserCard: React.FC<Props> = ({ name, checked, onToggle, avatarUrl }) => {
    return (
        <div className={`${styles.card} ${styles.checkboxOnly}`}>
            <UserAvatar avatarUrl={avatarUrl} alt={name} className={styles.avatar} />
            <div className={styles.infoBlock}>
                <p className={styles.name}>{name}</p>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={checked}
                    onChange={(e) => onToggle?.(e.target.checked)}
                />
            </div>
        </div>
    );
};

export default CheckboxOnlyUserCard;
