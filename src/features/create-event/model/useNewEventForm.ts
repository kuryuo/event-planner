import { useState } from 'react';
import { useCreateEventMutation } from '@/shared/api/event/eventApi';
import { CreateEventRequest } from '@/shared/api/event/types';
import { validateCreateEvent } from '@/shared/lib/validation/validateCreateEvent';
import { useAppSelector } from '@/shared/lib/hooks';

import { EventInfoFormData, PositioningFormData } from './types';

export const useCreateEventForm = () => {
    const [eventInfo, setEventInfo] = useState<EventInfoFormData | null>(null);
    const [positioning, setPositioning] = useState<PositioningFormData | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userId = useAppSelector((state) => state.profile.id);
    const [createEvent] = useCreateEventMutation();

    const toISOString = (date: string) => new Date(date).toISOString();

    const handleSubmit = async () => {
        const validation = validateCreateEvent(eventInfo, positioning);
        if (!validation.isValid) {
            setNotification({ type: 'error', message: validation.message || 'Ошибка валидации' });
            return;
        }

        if (!userId) {
            setNotification({
                type: 'error',
                message: 'Пожалуйста, войдите в аккаунт или дождитесь загрузки профиля',
            });
            return;
        }

        const body: CreateEventRequest = {
            ...eventInfo!,
            responsiblePersonId: userId,
            startDate: toISOString(eventInfo!.startDate),
            endDate: toISOString(eventInfo!.endDate),
            categories: positioning!.categories,
            maxParticipants: positioning!.maxParticipants ?? 0,
        };

        try {
            await createEvent(body).unwrap();
            setNotification({ type: 'success', message: 'Мероприятие успешно создано!' });
        } catch {
            setNotification({ type: 'error', message: 'Ошибка при создании события' });
        }
    };

    return {
        eventInfo,
        positioning,
        notification,
        isModalOpen,
        setEventInfo,
        setPositioning,
        setNotification,
        setIsModalOpen,
        handleSubmit,
    };
};
