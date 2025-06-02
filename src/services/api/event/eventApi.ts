import { baseApi } from '../baseApi';
import { Event, CreateEventRequest, EventFilters, ProfileResponse } from '@/types';

export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Получить список ивентов с фильтрами
         */
        getEvents: builder.query<{ result: Event[] }, EventFilters | void>({
            query: (params) => {
                const preparedParams = {
                    ...params,
                    Count: 50,
                };
                return {
                    url: 'events',
                    method: 'GET',
                    params: preparedParams,
                };
            },
            providesTags: ['Events'],
        }),

        /**
         * Получить ивент по ID
         */
        getEventById: builder.query<Event, string>({
            query: (eventId) => `events/${eventId}`,
            transformResponse: (response: { result: Event }) => response.result,
            providesTags: ['Events'],
        }),

        /**
         * Создать ивент
         */
        createEvent: builder.mutation<Event, CreateEventRequest>({
            query: (body) => ({
                url: 'events',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Events'],
        }),

        /**
         * Обновить ивент по ID
         */
        updateEvent: builder.mutation<
            Event,
            { eventId: string; body: Partial<CreateEventRequest> }
        >({
            query: ({ eventId, body }) => ({
                url: 'events',
                method: 'PUT',
                params: { eventId },
                body,
            }),
            invalidatesTags: ['Events'],
        }),

        /**
         * Удалить ивент по ID
         */
        deleteEvent: builder.mutation<{ message: string }, string>({
            query: (eventId) => ({
                url: 'events',
                method: 'DELETE',
                params: { eventId },
            }),
            invalidatesTags: ['Events'],
        }),

        /**
         * Подписаться на ивент
         */
        createEventById: builder.mutation<void, string>({
            query: (eventId) => ({
                url: `events/${eventId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Subscribers'],
        }),

        /**
         * Отписаться от ивента
         */
        deleteEventById: builder.mutation<void, string>({
            query: (eventId) => ({
                url: `events/${eventId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Subscribers'],
        }),

        /**
         * Добавить пользователя к ивенту с ролью (необязательной)
         */
        addUserToEvent: builder.mutation<
            void,
            { eventId: string; userId: string; roleName?: string }
        >({
            query: ({ eventId, userId, roleName }) => ({
                url: `events/${eventId}/${userId}`,
                method: 'POST',
                params: roleName ? { roleName } : undefined,
            }),
            invalidatesTags: ['Subscribers'],
        }),

        /**
         * Получить роли пользователей на ивенте
         */
        getEventRoles: builder.query<string[], string>({
            query: (eventId) => ({
                url: `events/roles/${eventId}`,
                method: 'GET',
            }),
            transformResponse: (response: { res: { name: string }[] }) =>
                response.res.map((r) => r.name),
            providesTags: ['Events'],
        }),

        /**
         * Получить подписчиков ивента
         */
        getEventSubscribers: builder.query<ProfileResponse[], string>({
            query: (eventId) => ({
                url: 'events/subscribers',
                method: 'GET',
                params: { eventId },
            }),
            transformResponse: (response: { res: ProfileResponse[] }) => response.res,
            providesTags: ['Subscribers'],
        }),

        /**
         * Добавить пользователя как контактное лицо ивента
         */
        addContactToEvent: builder.mutation<void, { eventId: string; userId: string }>({
            query: ({ eventId, userId }) => ({
                url: 'events/contact',
                method: 'POST',
                params: { eventId, userId },
            }),
            invalidatesTags: ['Contacts'],
        }),

        /**
         * Получить список контактных лиц ивента
         */
        getEventContacts: builder.query<ProfileResponse[], string>({
            query: (eventId) => `events/${eventId}/contacts`,
            transformResponse: (response: { result: ProfileResponse[] }) => response.result,
            providesTags: ['Contacts'],
        }),

        /**
         * Поиск пользователей по имени (для выбора контакта или роли)
         */
        getEventUsers: builder.query<ProfileResponse[], string>({
            query: (userName) => ({
                url: 'events/users',
                method: 'GET',
                params: { userName },
            }),
            transformResponse: (response: { result: ProfileResponse[] }) => response.result,
        }),

        /**
         * Получить список фото, загруженных к ивенту
         */
        getEventPhotos: builder.query<{ result: string[] }, string>({
            query: (eventId) => `events/${eventId}/photos`,
            providesTags: ['Photos'],
        }),

        /**
         * Загрузить фото для ивента
         */
        uploadEventPhoto: builder.mutation<void, { eventId: string; file: File }>({
            query: ({ eventId, file }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: `events/${eventId}/photos`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Photos'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetEventsQuery,
    useGetEventByIdQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useCreateEventByIdMutation,
    useDeleteEventByIdMutation,
    useAddUserToEventMutation,
    useGetEventRolesQuery,
    useGetEventSubscribersQuery,
    useAddContactToEventMutation,
    useGetEventContactsQuery,
    useGetEventUsersQuery,
    useGetEventPhotosQuery,
    useUploadEventPhotoMutation,
} = eventApi;
