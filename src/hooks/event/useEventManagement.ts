import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useDeleteEventMutation,
    useGetEventByIdQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
} from '@/services/api/event/eventApi';
import { AppRoute } from '@/utils/const';
import { validateCreateEvent } from '@/utils/validation/validateCreateEvent';
import { EventInfoFormData, PositioningFormData, CreateEventRequest } from '@/types';
import { useCurrentProfile } from '@/hooks';
import { getEventLink } from '@/utils/navigation';

export const useEventManagement = (eventId: string | undefined, isEditMode: boolean) => {
    const navigate = useNavigate();

    const { data: event, error, isLoading } = useGetEventByIdQuery(eventId || '');
    const [deleteEvent] = useDeleteEventMutation();
    const [createEvent] = useCreateEventMutation();
    const [updateEvent] = useUpdateEventMutation();

    const currentUserId = useCurrentProfile().id;

    const [eventInfo, setEventInfo] = useState<EventInfoFormData | null>(null);
    const [positioning, setPositioning] = useState<PositioningFormData | null>(null);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info';
    } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (event && isEditMode) {
            setEventInfo(event);
            setPositioning(event);
        }
    }, [event, isEditMode]);

    const toISOString = (date: string) => new Date(date).toISOString();

    const handleCancel = () => {
        if (isEditMode && eventId && event) {
            navigate(getEventLink(eventId!, event.responsiblePersonId, currentUserId));
        } else {
            setIsModalOpen(true);
        }
    };

    const handleConfirmCancel = () => {
        setIsModalOpen(false);
        navigate(AppRoute.EVENT);
    };

    const handleConfirmDelete = async () => {
        try {
            if (eventId) {
                const response = await deleteEvent(eventId);

                setIsModalOpen(false);
                setNotification({
                    type: 'success',
                    message: response.data,
                });

                navigate(AppRoute.EVENT_LIST);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            setNotification({
                type: 'error',
                message: 'Произошла ошибка при удалении мероприятия.',
            });
        }
    };

    const handleSubmit = async () => {
        const validation = validateCreateEvent(eventInfo, positioning);
        if (!validation.isValid) {
            setNotification({ type: 'error', message: validation.message || 'Ошибка валидации' });
            return;
        }

        if (!currentUserId) {
            setNotification({
                type: 'error',
                message: 'Пожалуйста, войдите в аккаунт или дождитесь загрузки профиля',
            });
            return;
        }

        const startDateTime = `${eventInfo?.startDate}T${eventInfo?.startTime}`;
        const endDateTime = `${eventInfo?.endDate}T${eventInfo?.endTime}`;

        const startDateISO = toISOString(startDateTime);
        const endDateISO = toISOString(endDateTime);

        const body: CreateEventRequest = {
            ...eventInfo!,
            responsiblePersonId: currentUserId,
            startDate: startDateISO,
            endDate: endDateISO,
            categories: positioning!.categories,
            roles: positioning!.roles,
            maxParticipants: positioning!.maxParticipants ?? 0,
        };

        console.log('📦 Отправка мероприятия:', body);

        try {
            if (isEditMode && eventId) {
                await updateEvent({ eventId, body }).unwrap();
                setNotification({ type: 'success', message: 'Мероприятие успешно обновлено!' });

                navigate(getEventLink(eventId!, currentUserId, currentUserId));
            } else {
                await createEvent(body).unwrap();
                setNotification({ type: 'success', message: 'Мероприятие успешно создано!' });
                navigate(AppRoute.EVENT_LIST);
            }
        } catch {
            setNotification({
                type: 'error',
                message: isEditMode
                    ? 'Ошибка при обновлении мероприятия'
                    : 'Ошибка при создании события',
            });
        }
    };

    return {
        isLoading,
        error,
        event,
        notification,
        setNotification,
        isModalOpen,
        setIsModalOpen,
        handleCancel,
        handleConfirmCancel,
        handleConfirmDelete,
        handleSubmit,
        eventInfo,
        positioning,
        setEventInfo,
        setPositioning,
    };
};
