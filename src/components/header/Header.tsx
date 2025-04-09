import React from 'react';
import styles from './Header.module.css';
import notificationIcon from '@/assets/img/notification.svg';
import avatar from '@/assets/img/avatar.svg';

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.right}>
                <img src={notificationIcon} alt="Уведомления" className={styles.icon} />
                <img src={avatar} alt="Профиль" className={styles.avatar} />
            </div>
        </header>
    );
};

export default Header;
