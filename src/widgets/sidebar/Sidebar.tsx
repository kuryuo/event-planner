import React from 'react';
import { useNavigate } from 'react-router-dom';
import calendarIcon from '@/assets/img/calendar.svg';
import eventIcon from '@/assets/img/event.svg';
import logo from '@/assets/img/logo.svg';
import styles from './Sidebar.module.css';
import { AppRoute } from '@/const.ts';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(AppRoute.EVENT_LIST);
    };

    const handleCreateEventClick = () => {
        navigate(AppRoute.CREATE_EVENT);
    };

    return (
        <aside className={styles.sidebar}>
            <div>
                <img
                    src={logo}
                    alt="Logo"
                    className={styles.logo}
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <nav className={styles.menu}>
                <ul>
                    <li className={styles.menuItem} onClick={() => navigate(AppRoute.CALENDAR)}>
                        <img src={calendarIcon} alt="Календарь" className={styles.icon} />
                    </li>
                    <li className={styles.menuItem}>
                        <img
                            src={eventIcon}
                            alt="Создать мероприятие"
                            className={styles.icon}
                            onClick={handleCreateEventClick}
                            style={{ cursor: 'pointer' }}
                        />
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
