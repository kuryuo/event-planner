import React from 'react';
import styles from '../UserCard.module.css';
import avatar from '@/assets/img/avatar.svg';
import moreIcon from '@/assets/img/more.svg';

interface InteractiveUserCardProps {
    name: string;
    role?: string;
    onMenuClick?: () => void;
}

const InteractiveUserCard: React.FC<InteractiveUserCardProps> = ({ name, role, onMenuClick }) => {
    return (
        <div className={styles.card}>
            <img src={avatar} alt={name} className={styles.avatar} />
            <div className={styles.infoBlock}>
                <div className={styles.headerWithMenu}>
                    <p className={styles.name}>{name}</p>
                    <img src={moreIcon} alt="Меню" className={styles.menu} onClick={onMenuClick} />
                </div>
                {role && <p className={styles.role}>{role}</p>}
                <label className={styles.checkboxRow}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.label}>Добавить в блок "Контакты"</span>
                </label>
            </div>
        </div>
    );
};

export default InteractiveUserCard;
