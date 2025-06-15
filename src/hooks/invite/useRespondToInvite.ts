import { useRespondToInviteMutation } from '@/services/api/invite/inviteApi';

export function useRespondToInvite() {
    const [respondToInvite, { isLoading }] = useRespondToInviteMutation();

    const respond = async (inviteId: string, accept: boolean) => {
        try {
            await respondToInvite({ inviteId, accept }).unwrap();
        } catch (e) {
            console.error('Ошибка при ответе на приглашение:', e);
        }
    };

    return { respond, isLoading };
}
