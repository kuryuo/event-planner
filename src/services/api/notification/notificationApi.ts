import { baseApi } from '../baseApi';
import { Notification } from '@/types';

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Получить список всех уведомлений пользователя
         */
        getNotifications: builder.query<Notification[], void>({
            query: () => ({
                url: 'notifications',
                method: 'GET',
            }),
            providesTags: ['Notifications'],
        }),

        /**
         * Получить количество непрочитанных уведомлений
         */
        getUnreadNotificationCount: builder.query<number, void>({
            query: () => ({
                url: 'notifications/unread-count',
                method: 'GET',
            }),
            providesTags: ['Notifications'],
        }),

        /**
         * Отметить одно уведомление как прочитанное
         */
        markNotificationAsRead: builder.mutation<void, string>({
            query: (notificationId) => ({
                url: `notifications/${notificationId}/read`,
                method: 'POST',
            }),
            invalidatesTags: ['Notifications'],
        }),

        /**
         * Отметить все уведомления как прочитанные
         */
        markAllNotificationsAsRead: builder.mutation<void, void>({
            query: () => ({
                url: 'notifications/read-all',
                method: 'POST',
            }),
            invalidatesTags: ['Notifications'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetNotificationsQuery,
    useGetUnreadNotificationCountQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
} = notificationApi;
