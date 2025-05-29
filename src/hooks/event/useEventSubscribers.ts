import { useGetEventSubscribersQuery } from '@/services/api/event/eventApi';

export const useEventSubscribers = (eventId?: string) => {
    const {
        data,
        isLoading,
        isError,
    } = useGetEventSubscribersQuery(eventId!, {
        skip: !eventId,
    });

    const subscribers = Array.isArray(data?.res) ? data.res : [];

    return {
        subscribers,
        isLoading,
        isError,
    };
};
