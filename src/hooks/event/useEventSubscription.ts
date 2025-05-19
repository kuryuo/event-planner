import { useState, useEffect } from 'react';
import {
    useCreateEventByIdMutation,
    useDeleteEventByIdMutation,
} from '@/services/api/event/eventApi';
import { useCurrentProfile } from '@/hooks';

export const useEventSubscription = (eventId: string, initialSubscribed: boolean) => {
    const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
    const [subscribe] = useCreateEventByIdMutation();
    const [unsubscribe] = useDeleteEventByIdMutation();
    const currentUserId = useCurrentProfile().id;

    useEffect(() => {
        setIsSubscribed(initialSubscribed);
    }, [initialSubscribed]);

    const handleToggleSubscription = async () => {
        try {
            if (!eventId || !currentUserId) return;

            const response = await (isSubscribed ? unsubscribe(eventId) : subscribe(eventId));

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
