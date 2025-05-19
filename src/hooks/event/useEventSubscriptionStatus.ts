import { useMemo } from 'react';
import { useCurrentProfile, useEventSubscribers, useEventSubscription } from '@/hooks';

export const useEventSubscriptionStatus = (eventId?: string) => {
    const currentUserId = useCurrentProfile().id;

    const {
        subscribers,
        isLoading: isSubscribersLoading,
        isError: isSubscribersError,
    } = useEventSubscribers(eventId);

    const initialSubscribed = useMemo(() => {
        if (!subscribers || !currentUserId) return false;
        return subscribers.some((user: { id: string }) => user.id === currentUserId);
    }, [subscribers, currentUserId]);

    const { isSubscribed, handleToggleSubscription } = useEventSubscription(
        eventId || '',
        initialSubscribed,
    );

    return {
        subscribers,
        isSubscribersLoading,
        isSubscribersError,
        isSubscribed,
        handleToggleSubscription,
    };
};
