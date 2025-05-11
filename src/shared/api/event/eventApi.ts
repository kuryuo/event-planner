import { baseApi } from '../baseApi';

export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<any, Record<string, any> | void>({
            query: (params) => ({
                url: 'events',
                method: 'GET',
                params: params ?? undefined,
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
    }),
    overrideExisting: false,
});

export const {
    useGetEventsQuery,
    useGetEventByIdQuery,
    useCreateEventMutation,
    useDeleteEventMutation,
} = eventApi;
