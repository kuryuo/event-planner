import { useMarkNotificationAsReadMutation, useMarkAllNotificationsAsReadMutation } from '@/services/api/notification/notificationApi';

export function useMarkNotification() {
    const [markOne] = useMarkNotificationAsReadMutation();
    const [markAll] = useMarkAllNotificationsAsReadMutation();

    const markNotificationAsRead = async (id: string) => {
        try {
            await markOne(id);
        } catch (e) {
            console.error('Ошибка при отметке уведомления как прочитанного', e);
        }
    };

    const markAllNotificationsAsRead = async () => {
        try {
            await markAll();
        } catch (e) {
            console.error('Ошибка при отметке всех уведомлений', e);
        }
    };

    return { markNotificationAsRead, markAllNotificationsAsRead };
}
