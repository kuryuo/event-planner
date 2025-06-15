import React, { useState } from 'react';
import { useGetEventsQuery } from '@/services/api/event/eventApi';
import { Event } from '@/types';
import EventCalendar from './EventCalendar';
import EventModal from '@/components/event/event-modal/EventModal';
import { EventFilters } from '@/types';
import { useCurrentProfile, useCalendar } from '@/hooks';

const CalendarContainer: React.FC = () => {
    const [filters, setFilters] = useState<EventFilters>({});
    const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== undefined)
    );

    const { data = { result: [] }, error, isLoading } = useGetEventsQuery({ ...cleanedFilters, count: 50 });

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

    const events = Array.isArray(data?.result) ? data.result : [];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading events</div>;

    return (
        <div>
            <EventCalendar
                date={currentDate}
                events={events.map((event: Event) => ({
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
