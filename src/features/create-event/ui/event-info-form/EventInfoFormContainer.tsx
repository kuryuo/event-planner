import React, { useState, useEffect } from 'react';
import EventInfoForm from './EventInfoForm';
import { EventInfoFormData } from '@/features/create-event/model/types';

interface Props {
    onChange?: (data: EventInfoFormData) => void;
}

const EventInfoFormContainer: React.FC<Props> = ({ onChange }) => {
    const [formData, setFormData] = useState<EventInfoFormData>({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        format: 'online',
        eventType: 'open',
        responsiblePersonId: '',
    });

    useEffect(() => {
        if (onChange) {
            onChange(formData);
        }
    }, [formData, onChange]);

    return (
        <EventInfoForm
            formData={formData}
            onChange={setFormData}
        />
    );
};

export default EventInfoFormContainer;
