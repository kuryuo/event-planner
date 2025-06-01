import { useGetEventSubscribersQuery } from '@/services/api/event/eventApi';

export const useEventSubscribers = (eventId?: string) => {
    const {
        data: subscribers = [],
        isLoading,
        isError,
    } = useGetEventSubscribersQuery(eventId!, { skip: !eventId });

    return {
        subscribers,
        isLoading,
        isError,
    };
};