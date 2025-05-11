import React from 'react';
import { useSelector } from 'react-redux';
import { useGetEventsQuery } from '@/shared/api/event/eventApi';
import { Link } from 'react-router-dom';
import styles from './EventsListPage.module.css';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import EventsToolbar from '@/widgets/events-toolbar/EventsToolbar';
import EventListItem from "@/entities/event/ui/event-list-item/EventListItem";
import { RootState } from '@/app/store';
import { formatDateToMonthDay, formatTime } from '@/shared/lib/dateUtils';
import { AppRoute } from '@/const';

const EventsListPage: React.FC = () => {
    const { error, isLoading } = useGetEventsQuery();
    const events = useSelector((state: RootState) => state.events.events);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading events</div>;
    }

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Календарь" />
                <EventsToolbar
                    label="Март 2025"
                    onNavigate={() => {}}
                    date={new Date()}
                />
                {events.length > 0 ? (
                    events.map((event) => (
                        <Link
                            key={event.id}
                            to={AppRoute.EVENT.replace(":eventId", event.id)}
                        >
                            <EventListItem
                                day={formatDateToMonthDay(event.startDate)}
                                time={`${formatTime(event.startDate)} - ${formatTime(event.endDate)}`}
                                title={event.name}
                                color="#a8d5a2"
                            />
                        </Link>
                    ))
                ) : (
                    <div>No events available.</div>
                )}
            </div>
        </div>
    );
};

export default EventsListPage;
