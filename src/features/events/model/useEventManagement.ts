import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteEventMutation, useGetEventByIdQuery, useCreateEventMutation } from '@/shared/api/event/eventApi';
import { AppRoute } from '@/const';
import { CreateEventRequest } from '@/shared/api/event/types';
import { validateCreateEvent } from '@/shared/lib/validation/validateCreateEvent';
import { useAppSelector } from '@/shared/hooks';
import { EventInfoFormData, PositioningFormData } from './types';

export const useEventManagement = (eventId: string | undefined, isEditMode: boolean) => {
    const navigate = useNavigate();

    const { data: event, error, isLoading } = useGetEventByIdQuery(eventId || '');
    const [deleteEvent] = useDeleteEventMutation();
    const [createEvent] = useCreateEventMutation();

    const userId = useAppSelector((state) => state.profile.id);

    const [eventInfo, setEventInfo] = useState<EventInfoFormData | null>(null);
    const [positioning, setPositioning] = useState<PositioningFormData | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'} | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (event && isEditMode) {
            setEventInfo(event);
            setPositioning(event);
        }
    }, [event, isEditMode]);

    const toISOString = (date: string) => new Date(date).toISOString();

    const handleCancel = () => {
        if (isEditMode && eventId) {
            navigate(AppRoute.EVENT.replace(':eventId', eventId));
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
        if (isEditMode) {
            setNotification({
                type: 'info',
                message: 'Вы в режиме редактирования, запрос на создание не будет отправлен',
            });
            return;
        }

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

        const startDateTime = `${eventInfo?.startDate}T${eventInfo?.startTime}`;
        const endDateTime = `${eventInfo?.endDate}T${eventInfo?.endTime}`;

        const startDateISO = toISOString(startDateTime);
        const endDateISO = toISOString(endDateTime);

        const body: CreateEventRequest = {
            ...eventInfo!,
            responsiblePersonId: userId,
            startDate: startDateISO,
            endDate: endDateISO,
            categories: positioning!.categories,
            roles: positioning!.roles,
            maxParticipants: positioning!.maxParticipants ?? 0,
        };

        console.log('Данные, отправленные на сервер:', body);

        try {
            await createEvent(body).unwrap();
            setNotification({ type: 'success', message: 'Мероприятие успешно создано!' });
        } catch {
            setNotification({ type: 'error', message: 'Ошибка при создании события' });
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
