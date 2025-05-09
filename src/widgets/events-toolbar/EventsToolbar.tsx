import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './EventsToolbar.module.css'
import calendarIcon from '@/assets/img/calendar2.svg'
import listIcon from '@/assets/img/list.svg'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {AppRoute} from "@/const";

type ToolbarProps = {
    label: string
    onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => void
    date: Date
}

const EventsToolbar: React.FC<ToolbarProps> = ({ onNavigate, date }) => {
    const navigate = useNavigate()

    const month = format(date, 'LLLL', { locale: ru })
    const year = format(date, 'yyyy', { locale: ru })
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <button className={styles.arrow} onClick={() => onNavigate('PREV')}>&lt;</button>
                <span className={styles.month}>
          {capitalizedMonth} <span className={styles.year}>{year}</span>
        </span>
                <button className={styles.arrow} onClick={() => onNavigate('NEXT')}>&gt;</button>
            </div>

            <div className={styles.right}>
                <button className={styles.iconButton} onClick={() => navigate(AppRoute.CALENDAR)}>
                    <img src={calendarIcon} alt="Календарь" />
                </button>
                <button className={styles.iconButton} onClick={() => navigate(AppRoute.EVENT_LIST)}>
                    <img src={listIcon} alt="Список" />
                </button>
            </div>
        </div>
    )
}

export default EventsToolbar
