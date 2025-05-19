import React, { useState, useEffect } from 'react';
import EventInfoForm from './EventInfoForm';
import { EventInfoFormData } from '@/services/events/types';

interface Props {
    onChange?: (data: EventInfoFormData) => void;
    initialValues?: EventInfoFormData | null;
}

const EventInfoFormContainer: React.FC<Props> = ({ onChange, initialValues }) => {
    const [formData, setFormData] = useState<EventInfoFormData>({
        name: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        location: '',
        format: 'online',
        eventType: 'open',
        responsiblePersonId: '',
    });

    useEffect(() => {
        if (
            initialValues &&
            (initialValues.startDate !== formData.startDate ||
                initialValues.endDate !== formData.endDate)
        ) {
            setFormData({
                ...initialValues,

                startDate: formatDateForInput(initialValues.startDate),
                endDate: formatDateForInput(initialValues.endDate),
                startTime: formatTimeForInput(initialValues.startDate),
                endTime: formatTimeForInput(initialValues.endDate),
            });
        }
    }, [initialValues, formData.startDate, formData.endDate]);

    useEffect(() => {
        if (onChange) {
            onChange(formData);
        }
    }, [formData, onChange]);

    return <EventInfoForm formData={formData} onChange={setFormData} />;
};

const formatDateForInput = (date: string) => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = parsedDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatTimeForInput = (dateTime: string) => {
    const parsedDate = new Date(dateTime);
    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

export default EventInfoFormContainer;
