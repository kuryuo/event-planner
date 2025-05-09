import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import notificationIcon from '@/assets/img/notification.svg';
import avatar from '@/assets/img/avatar.svg';
import { AppRoute } from '@/const.ts';

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate(AppRoute.PROFILE);
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.right}>
                <img src={notificationIcon} alt="Уведомления" className={styles.icon} />
                <img
                    src={avatar}
                    alt="Профиль"
                    className={styles.avatar}
                    onClick={handleProfileClick}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </header>
    );
};

export default Header;
