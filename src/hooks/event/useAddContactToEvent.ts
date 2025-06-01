import { useAddContactToEventMutation } from '@/services/api/event/eventApi';

export const useContactActions = () => {
    const [addContactMutation, { isLoading: isAdding }] = useAddContactToEventMutation();

    const addContact = async ({ eventId, userId }: { eventId: string; userId: string }) => {
        try {
            const res = await addContactMutation({ eventId, userId }).unwrap();
            console.log('[addContactToEvent success]', res);
        } catch (e) {
            console.error('[addContactToEvent error]', e);
        }
    };

    return {
        addContact,
        isLoading: isAdding
    };
};