import React, {useEffect} from 'react';
import { useGetEventsQuery } from '@/shared/api/event/eventApi';
import { Event } from '@/features/events/model/eventsSlice';
import EventCalendar from './EventCalendar';
import EventModal from './EventModal';
import { useCalendar } from '../model/useCalendar';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const CalendarContainer: React.FC = () => {
    const { data = [], error, isLoading, refetch } = useGetEventsQuery();

    const calendarEvents = data.map((event: Event) => ({
        id: event.id,
        title: event.name,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        allDay: false,
        responsiblePersonId: event.responsiblePersonId,
    }));

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

    useEffect(() => {
        refetch();
    }, [selectedDate, refetch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading events</div>;
    }

    return (
        <div>
            <EventCalendar
                date={currentDate}
                events={calendarEvents}
                onNavigate={onNavigate}
                onShowMore={onShowEvents}
                currentUserId={currentUserId}
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
