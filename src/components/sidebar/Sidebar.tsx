import React from 'react';
import calendarIcon from '@/assets/img/calendar.svg';
import eventIcon from '@/assets/img/event.svg';
import logo from '@/assets/img/logo.svg';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <div>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <nav className={styles.menu}>
                <ul>
                    <li className={styles.menuItem}>
                        <img src={calendarIcon} alt="Календарь" className={styles.icon} />
                    </li>
                    <li className={styles.menuItem}>
                        <img src={eventIcon} alt="Создать мероприятие" className={styles.icon} />
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
