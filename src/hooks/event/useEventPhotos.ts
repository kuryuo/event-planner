import { useGetEventPhotosQuery } from '@/services/api/event/eventApi';

export const useEventPhotos = (eventId: string) => {
    const { data = [], isLoading, isError, refetch } = useGetEventPhotosQuery(eventId, {
        skip: !eventId,
    });

    return { photos: data, isLoading, isError, refetch };
};
