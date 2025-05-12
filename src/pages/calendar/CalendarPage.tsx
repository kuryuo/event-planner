import React from 'react'
import styles from './CalendarPage.module.css'
import Sidebar from '@/widgets/sidebar/Sidebar'
import Header from '@/widgets/header/Header'
import CalendarContainer from '@/features/calendar/ui/CalendarContainer'

const CalendarPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Календарь" />
                <div className={styles.calendarWrapper}>
                    <CalendarContainer />
                </div>
            </div>
        </div>
    )
}

export default CalendarPage
