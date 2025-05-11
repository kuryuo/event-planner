import { baseApi } from '../baseApi';

export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<any, Record<string, any> | void>({
            query: (params) => ({
                url: 'events',
                method: 'GET',
                params: { ...params, Count: 10 },
            }),
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
        }),
        deleteEvent: builder.mutation<any, string>({
            query: (eventId) => ({
                url: 'events',
                method: 'DELETE',
                params: { eventId },
            }),
        }),
        createEventById: builder.mutation<any, { eventId: string, body: any }>({
            query: ({ eventId, body }) => ({
                url: `events/${eventId}`,
                method: 'POST',
                body,
            }),
        }),
        deleteEventById: builder.mutation<any, string>({
            query: (eventId) => ({
                url: `events/${eventId}`,
                method: 'DELETE',
            }),
        }),
        addUserToEvent: builder.mutation<any, { eventId: string, userId: string, roleId?: string }>({
            query: ({ eventId, userId, roleId }) => ({
                url: `events/${eventId}/${userId}`,
                method: 'POST',
                params: { roleId },
            }),
        }),
        getEventRoles: builder.query<any, string>({
            query: (eventId) => `events/roles/${eventId}`,
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetEventsQuery,
    useGetEventByIdQuery,
    useCreateEventMutation,
    useDeleteEventMutation,
    useCreateEventByIdMutation,
    useDeleteEventByIdMutation,
    useAddUserToEventMutation,
    useGetEventRolesQuery,
} = eventApi;
