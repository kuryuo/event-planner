import { useState } from 'react';
import { useAddUserToEventMutation } from '@/services/api/event/eventApi';

export const useChangeRoleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [currentRole, setCurrentRole] = useState<string | undefined>(undefined);
    const [addUserToEvent] = useAddUserToEventMutation();

    const open = (userId: string, role?: string) => {
        setCurrentUserId(userId);
        setCurrentRole(role);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setCurrentUserId(null);
        setCurrentRole(undefined);
    };

    const submit = async ({ eventId, roleName }: { eventId: string; roleName: string }) => {
        if (!currentUserId) {
            console.warn('[ChangeRoleModal] Нет userId');
            return;
        }

        try {
            console.log('[ChangeRoleModal] eventId:', eventId);
            console.log('[ChangeRoleModal] userId:', currentUserId);
            console.log('[ChangeRoleModal] roleName:', roleName);

            const result = await addUserToEvent({
                eventId,
                userId: currentUserId,
                roleName,
            });

            console.log('[ChangeRoleModal] Ответ от сервера:', result);
        } catch (error) {
            console.error('[ChangeRoleModal] Ошибка при отправке запроса:', error);
        } finally {
            close();
        }
    };

    return {
        isOpen,
        open,
        close,
        submit,
        currentUserId,
        currentRole,
    };
};
