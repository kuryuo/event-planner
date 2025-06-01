import { useGetEventContactsQuery } from '@/services/api/event/eventApi';

export const useEventContacts = (eventId?: string) => {
    const {
        data: contacts = [],
        isLoading,
        isError,
        refetch,
    } = useGetEventContactsQuery(eventId!, {
        skip: !eventId,
    });

    return {
        contacts,
        isLoading,
        isError,
        refetch,
    };
};
