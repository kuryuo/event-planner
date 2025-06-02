import { useSendInviteMutation } from '@/services/api/invite/inviteApi';
import { useCallback, useState } from 'react';

type Toast = {
    id: string;
    message: string;
    type: 'success' | 'error';
};

export function useSendInvites(eventId: string) {
    const [sendInvite] = useSendInviteMutation();
    const [toasts, setToasts] = useState<Toast[]>([]);

    const sendInvites = useCallback(
        async (userIds: string[]) => {
            const newToasts: Toast[] = [];

            for (const invitedId of userIds) {
                try {
                    const response = await sendInvite({ eventId, invitedId }).unwrap();
                    console.log(`Приглашение отправлено:`, response);

                    newToasts.push({
                        id: invitedId,
                        message: 'Приглашение успешно отправлено',
                        type: 'success',
                    });
                } catch (error) {
                    console.error(`Ошибка при приглашении ${invitedId}:`, error);

                    newToasts.push({
                        id: invitedId,
                        message: `Ошибка при отправке приглашения`,
                        type: 'error',
                    });
                }
            }

            setToasts(newToasts);
        },
        [eventId, sendInvite]
    );

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return { sendInvites, toasts, removeToast };
}
