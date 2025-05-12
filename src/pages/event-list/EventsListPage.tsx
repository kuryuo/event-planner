import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetEventsQuery } from '@/shared/api/event/eventApi';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';
import styles from './EventsListPage.module.css';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import EventsToolbar from '@/widgets/events-toolbar/EventsToolbar';
import EventListItem from '@/entities/event/ui/event-list-item/EventListItem';
import { RootState } from '@/app/store';
import { formatDateToMonthDay, formatTime } from '@/shared/lib/dateUtils';
import { Event } from '@/features/events/model/eventsSlice';

const EventsListPage: React.FC = () => {
    const { data, error, isLoading, refetch } = useGetEventsQuery();
    const events = data || [];
    const currentUserId = useSelector((state: RootState) => state.profile.id);

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading events</div>;
    }

    const getEventLink = (eventId: string, responsiblePersonId: string) => {
        const mode = responsiblePersonId === currentUserId ? 'organizer' : 'participant';
        return `${AppRoute.EVENT.replace(':eventId', eventId)}?mode=${mode}`;
    };

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Календарь" />
                <EventsToolbar label="Март 2025" onNavigate={() => {}} date={new Date()} />
                {events.length > 0 ? (
                    events.map((event: Event) => {
                        // Преобразуем строки в объект Date перед передачей в функции
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
