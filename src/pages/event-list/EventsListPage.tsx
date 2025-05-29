import React, { useState, useEffect } from 'react';
import { useGetEventsQuery } from '@/services/api/event/eventApi';
import { Link } from 'react-router-dom';
import styles from './EventsListPage.module.css';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Header from '@/components/layout/header/Header';
import EventsToolbar from '@/components/event/events-toolbar/EventsToolbar';
import EventListItem from '@/components/ui/event-list-item/EventListItem';
import { useCalendar, useCurrentProfile } from '@/hooks';
import { formatDateToMonthDay, formatTime } from '@/utils/dateUtils';
import { Event, EventFilters } from '@/types';
import { startOfMonth, endOfMonth, isWithinInterval, format, addMonths, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getEventLink } from '@/utils/navigation';

const EventsListPage: React.FC = () => {
    const [filters, setFilters] = useState<EventFilters>({});
    const { data, error, isLoading } = useGetEventsQuery({ ...filters, count: 50 });
    const events: Event[] = Array.isArray(data?.result) ? data.result : [];
    const { currentDate, onNavigate } = useCalendar();
    const currentUserId = useCurrentProfile().id;

    const FILTER_STORAGE_KEY = 'event_filters';

    useEffect(() => {
        localStorage.removeItem(FILTER_STORAGE_KEY);
    }, []);

    const eventsInMonth = events.filter((event: Event) => {
        const eventStart = new Date(event.startDate);
        return isWithinInterval(eventStart, {
            start: startOfMonth(currentDate),
            end: endOfMonth(currentDate),
        });
    });

    const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => {
        let newDate = new Date();

        switch (action) {
            case 'PREV':
                newDate = subMonths(currentDate, 1);
                break;
            case 'NEXT':
                newDate = addMonths(currentDate, 1);
                break;
            case 'TODAY':
                newDate = new Date();
                break;
            case 'DATE':
            default:
                newDate = new Date();
                break;
        }

        onNavigate(newDate);
    };

    const filteredEvents = eventsInMonth;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading events</div>;

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Календарь" />
                <EventsToolbar
                    label={format(currentDate, 'LLLL yyyy', { locale: ru })}
                    onNavigate={handleNavigate}
                    date={currentDate}
                    onApplyFilters={setFilters}
                />
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event: Event) => {
                        const startDate = new Date(event.startDate);
                        const endDate = new Date(event.endDate);

                        return (
                            <Link
                                key={event.id}
                                to={getEventLink(
                                    event.id,
                                    event.responsiblePersonId,
                                    currentUserId,
                                )}
                            >
                                <EventListItem
                                    day={formatDateToMonthDay(startDate)}
                                    time={`${formatTime(startDate)} - ${formatTime(endDate)}`}
                                    title={event.name}
                                    color="#a8d5a2"
                                />
                            </Link>
                        );
                    })
                ) : (
                    <div className={styles.empty}>Пока нет ни одного мероприятия(</div>
                )}
            </div>
        </div>
    );
};


export default EventsListPage;
