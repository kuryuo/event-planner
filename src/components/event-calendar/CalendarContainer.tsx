import React, { useEffect, useState } from 'react';
import { useGetEventsQuery } from '@/services/api/event/eventApi';
import { Event } from '@/types';
import EventCalendar from './EventCalendar';
import EventModal from '../event-modal/EventModal';
import { EventFilters } from '@/types';
import { useCurrentProfile, useEventFilter, useCalendar } from '@/hooks';

const CalendarContainer: React.FC = () => {
    const { data = [], error, isLoading, refetch } = useGetEventsQuery();
    const [filters, setFilters] = useState<EventFilters>({});
    const currentUserId = useCurrentProfile().id;

    const {
        currentDate,
        onNavigate,
        selectedEvents,
        isModalOpen,
        onShowEvents,
        closeModal,
        selectedDate,
    } = useCalendar();

    const filteredEvents = useEventFilter(data, filters);

    useEffect(() => {
        refetch();
    }, [selectedDate, refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading events</div>;

    return (
        <div>
            <EventCalendar
                date={currentDate}
                events={filteredEvents.map((event: Event) => ({
                    id: event.id,
                    title: event.name,
                    start: new Date(event.startDate),
                    end: new Date(event.endDate),
                    allDay: false,
                    responsiblePersonId: event.responsiblePersonId,
                }))}
                onNavigate={onNavigate}
                onShowMore={onShowEvents}
                currentUserId={currentUserId}
                onApplyFilters={setFilters}
            />

            {isModalOpen && (
                <EventModal
                    selectedDate={selectedDate || new Date()}
                    events={selectedEvents}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default CalendarContainer;
