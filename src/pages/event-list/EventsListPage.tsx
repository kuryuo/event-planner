import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetEventsQuery } from '@/services/api/event/eventApi';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/utils/const';
import styles from './EventsListPage.module.css';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import EventsToolbar from '@/components/events-toolbar/EventsToolbar';
import EventListItem from '@/components/event-list-item/EventListItem';
import { RootState } from '@/app/store';
import { formatDateToMonthDay, formatTime } from '@/utils/dateUtils';
import { Event } from '@/services/events/eventsSlice';
import { startOfMonth, endOfMonth, isWithinInterval, format, addMonths, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useCalendar } from '@/hooks/useCalendar';
import { EventFilters } from '@/services/api/event/types';
import { useEventFilter } from '@/hooks/useEventFilter';

const EventsListPage: React.FC = () => {
    const { data, error, isLoading } = useGetEventsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const events = data || [];
    const currentUserId = useSelector((state: RootState) => state.profile.id);
    const FILTER_STORAGE_KEY = 'event_filters';

    useEffect(() => {
        localStorage.removeItem(FILTER_STORAGE_KEY);
    }, []);

    const { currentDate, onNavigate } = useCalendar();
    const [filters, setFilters] = useState<EventFilters>({});

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
            case 'DATE':
            default:
                newDate = new Date();
                break;
        }

        onNavigate(newDate);
    };

    const eventsInMonth = events.filter((event: Event) => {
        const eventStart = new Date(event.startDate);
        return isWithinInterval(eventStart, {
            start: startOfMonth(currentDate),
            end: endOfMonth(currentDate),
        });
    });

    const filteredEvents = useEventFilter(eventsInMonth, filters);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading events</div>;

    const getEventLink = (eventId: string, responsiblePersonId: string) => {
        const mode = responsiblePersonId === currentUserId ? 'organizer' : 'participant';
        return `${AppRoute.EVENT.replace(':eventId', eventId)}?mode=${mode}`;
    };

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
                            <Link key={event.id} to={getEventLink(event.id, event.responsiblePersonId)}>
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
