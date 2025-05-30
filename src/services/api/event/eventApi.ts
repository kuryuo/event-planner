import { baseApi } from '../baseApi';
import { Event } from '@/types';

export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<{ result: Event[] }, Record<string, any> | void>({
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
            providesTags: ['Events']
        }),

        getEventById: builder.query<any, string>({
            query: (eventId) => `events/${eventId}`,
        }),

        createEvent: builder.mutation<any, any>({
            query: (body) => ({
                url: 'events',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Events']
        }),

        updateEvent: builder.mutation<any, { eventId: string; body: any }>({
            query: ({ eventId, body }) => ({
                url: 'events',
                method: 'PUT',
                params: { eventId },
                body,
            }),
            invalidatesTags: ['Events']
        }),

        deleteEvent: builder.mutation<any, string>({
            query: (eventId) => ({
                url: 'events',
                method: 'DELETE',
                params: { eventId },
            }),
            invalidatesTags: ['Events']
        }),

        createEventById: builder.mutation<any, string>({ // подписка
            query: (eventId) => ({
                url: `events/${eventId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Subscribers']
        }),

        deleteEventById: builder.mutation<any, string>({ //отписка
            query: (eventId) => ({
                url: `events/${eventId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Subscribers']
        }),

        addUserToEvent: builder.mutation<any, { eventId: string; userId: string; roleId?: string }>({
            query: ({ eventId, userId, roleId }) => ({
                url: `events/${eventId}/${userId}`,
                method: 'POST',
                params: roleId ? { roleId } : undefined,
            }),
        }),

        getEventRoles: builder.query<any, string>({
            query: (eventId) => `events/roles/${eventId}`,
        }),

        getEventSubscribers: builder.query<any, string>({
            query: (eventId) => ({
                url: 'events/subscribers',
                method: 'GET',
                params: { eventId },
            }),
            providesTags: ['Subscribers']
        }),

        getEventPhotos: builder.query<{ result: string[] }, string>({
            query: (eventId) => `events/${eventId}/photos`,
            providesTags: ['Photos']
        }),

        uploadEventPhoto: builder.mutation<any, { eventId: string; file: File }>({
            query: ({ eventId, file }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `events/${eventId}/photos`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Photos']
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetEventsQuery, //список ивентов
    useGetEventByIdQuery, //найти ивент по id ивент
    useCreateEventMutation, //создать ивент
    useUpdateEventMutation, //обновить ивент
    useDeleteEventMutation, //удалить ивент
    useCreateEventByIdMutation, //подписка
    useDeleteEventByIdMutation, //отписка
    useAddUserToEventMutation, //задать роль
    useGetEventRolesQuery, //роли на ивенте
    useGetEventSubscribersQuery, //список подписчиков
    useGetEventPhotosQuery, //фотки
    useUploadEventPhotoMutation, //загрузить фотки
} = eventApi;
