import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import styles from './EventCalendar.module.css';
import { EventType } from '@/hooks';
import EventsToolbar from '@/components/events-toolbar/EventsToolbar';
import { format as dateFnsFormat } from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import { EventFilters } from '@/types';
import { getEventLink } from '@/utils/navigation';

const locales = { ru };

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

type EventCalendarProps = {
    date: Date;
    events: EventType[];
    onNavigate: (date: Date) => void;
    onShowMore: (events: EventType[], date: Date) => void;
    currentUserId: string;
    onApplyFilters: (filters: EventFilters) => void;
};

const EventCalendar: React.FC<EventCalendarProps> = ({
    date,
    events,
    onNavigate,
    onShowMore,
    currentUserId,
    onApplyFilters,
}) => {
    const navigate = useNavigate();

    const onEventClick = (eventId: string, responsiblePersonId: string) => {
        navigate(getEventLink(eventId, responsiblePersonId, currentUserId));
    };

    const CustomToolbar = (props: any) => (
        <EventsToolbar {...props} onApplyFilters={onApplyFilters} />
    );

    return (
        <div className={styles.calendarWrapper}>
            <Calendar
                components={{ toolbar: CustomToolbar }}
                formats={{
                    weekdayFormat: (date: Date) => dateFnsFormat(date, 'EEEE', { locale: ru }),
                }}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={date}
                onNavigate={onNavigate}
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
                selectable={true}
                onShowMore={onShowMore}
                onSelectEvent={(event) => onEventClick(event.id, event.responsiblePersonId)}
            />
        </div>
    );
};

export default EventCalendar;
