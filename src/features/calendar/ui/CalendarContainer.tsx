import React, { useEffect, useState } from 'react';
import { useGetEventsQuery } from '@/shared/api/event/eventApi';
import { Event } from '@/features/events/model/eventsSlice';
import EventCalendar from './EventCalendar';
import EventModal from './EventModal';
import { useCalendar } from '../model/useCalendar';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { EventFilters } from '@/shared/api/event/types';
import { useEventFilter } from '@/features/filter/model/useEventFilter';

const CalendarContainer: React.FC = () => {
    const { data = [], error, isLoading, refetch } = useGetEventsQuery();
    const [filters, setFilters] = useState<EventFilters>({});
    const currentUserId = useSelector((state: RootState) => state.profile.id);

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