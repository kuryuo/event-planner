import { useGetEventPhotosQuery } from '@/services/api/event/eventApi';

export const useEventPhotos = (eventId: string) => {
    const { data, isLoading, isError } = useGetEventPhotosQuery(eventId, {
        skip: !eventId,
    });

    const photos = Array.isArray(data?.result) ? data.result : [];

    return { photos, isLoading, isError };
};
