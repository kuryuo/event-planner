import { useGetNotificationsQuery } from '@/services/api/notification/notificationApi';
import { useMemo } from 'react';
import inviteIcon from '@/assets/img/invite.svg';
import { Invite } from '@/types/invite';

export function useInviteNotifications() {
    const { data: notifications = [], isLoading, isError } = useGetNotificationsQuery();

    const invites: Invite[] = useMemo(() => {
        return notifications
            .filter((n) => n.type === 'Invite')
            .map((n) => {
                try {
                    const payload = JSON.parse(n.payload);
                    return {
                        id: n.id,
                        inviteId: payload.invite_id,
                        eventId: payload.event_id,
                        inviterUsername: payload.inviter_username,
                        communityName: payload.community_name,
                        avatar: inviteIcon,
                        isRead: n.isRead,
                    };
                } catch (e) {
                    console.error('[Invite] Ошибка разбора payload:', e);
                    return null;
                }
            })
            .filter(Boolean) as Invite[];
    }, [notifications]);

    const hasUnread = invites.some((invite) => !invite.isRead);

    return { invites, isLoading, isError, hasUnread };

}
