import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ru } from 'date-fns/locale'
import React from 'react'
import EventsToolbar from "@/widgets/events-toolbar/EventsToolbar";
import { format as dateFnsFormat } from 'date-fns'
import styles from './CalendarPage.module.css'

const locales = {
    ru: ru,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
})


type EventType = {
    title: string
    start: Date
    end: Date
    allDay?: boolean
}

const events: EventType[] = [
    {
        title: 'Пример события',
        start: new Date(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000),
        allDay: false,
    },
]

const EventCalendar: React.FC = () => {
    return (
        <div className={styles.calendarWrapper}>
            <Calendar
                components={{
                    toolbar: EventsToolbar,
                }}
                formats={{
                    weekdayFormat: (date: Date) =>
                        dateFnsFormat(date, 'EEEE', { locale: ru }),
                }}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                views={['month']}
                messages={{
                    today: 'Сегодня',
                    next: 'Вперед',
                    previous: 'Назад',
                    month: 'Месяц',
                    week: 'Неделя',
                    day: 'День',
                    agenda: 'Повестка',
                }}
                style={{ height: '100%' }}
            />
        </div>
    )
}

export default EventCalendar