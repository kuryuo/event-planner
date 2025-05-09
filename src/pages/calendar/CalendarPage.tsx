import React from 'react'
import styles from './CalendarPage.module.css'
import Sidebar from '@/widgets/sidebar/Sidebar'
import Header from '@/widgets/header/Header'
import EventCalendar from '@/widgets/calendar/EventCalendar'

const CalendarPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Календарь" />
                <div className={styles.calendarWrapper}>
                    <EventCalendar />
                </div>
            </div>
        </div>
    )
}

export default CalendarPage
