import { useState } from 'react';

export type EventType = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    responsiblePersonId: string;
};

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onNavigate = (date: Date) => {
        setCurrentDate(date);
    };

    const onShowEvents = (events: EventType[], date: Date) => {

        const filteredEvents = events.filter(event => {
            setSelectedDate(date);
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);

            return (
                eventStart.toDateString() === date.toDateString() ||
                eventEnd.toDateString() === date.toDateString() ||
                (eventStart <= date && eventEnd >= date)
            );
        });

        console.log('Filtered Events:', filteredEvents);

        setSelectedEvents(filteredEvents);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return {
        currentDate,
        selectedDate,
        onNavigate,
        selectedEvents,
        isModalOpen,
        onShowEvents,
        closeModal,
    };
};
