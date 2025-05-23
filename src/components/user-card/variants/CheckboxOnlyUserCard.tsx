import React from 'react';
import styles from '@/components/user-card/UserCard.module.css';
import avatar from '@/assets/img/avatar.svg';

interface Props {
    name: string;
    checked?: boolean;
    onToggle?: (checked: boolean) => void;
}

const CheckboxOnlyUserCard: React.FC<Props> = ({ name, checked, onToggle }) => {
    return (
        <div className={`${styles.card} ${styles.checkboxOnly}`}>
            <img src={avatar} alt={name} className={styles.avatar} />
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
