import { useState, useEffect } from 'react';
import {
    useCreateEventByIdMutation,
    useDeleteEventByIdMutation,
} from '@/shared/api/event/eventApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const useEventSubscription = (eventId: string, initialSubscribed: boolean) => {
    const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
    const [subscribe] = useCreateEventByIdMutation();
    const [unsubscribe] = useDeleteEventByIdMutation();
    const userId = useSelector((state: RootState) => state.profile.id);

    useEffect(() => {
        setIsSubscribed(initialSubscribed);
    }, [initialSubscribed]);

    const handleToggleSubscription = async () => {
        try {
            if (!eventId || !userId) return;

            const response = await (isSubscribed
                ? unsubscribe(eventId)
                : subscribe(eventId));

            if ('data' in response) {
                setIsSubscribed(!isSubscribed);
            } else {
                console.error('Ошибка подписки:', response.error);
            }
        } catch (error) {
            console.error('Ошибка при выполнении подписки:', error);
        }
    };

    return {
        isSubscribed,
        handleToggleSubscription,
    };
};
