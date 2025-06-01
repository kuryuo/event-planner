import { baseApi } from '../baseApi';
import { EventPost, CreateOrUpdateEventPostRequest } from '@/types';

export const eventPostApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Получить список постов события
         */
        getEventPosts: builder.query<EventPost[], { eventId: string }>({
            query: ({ eventId }) => ({
                url: 'events/posts',
                method: 'GET',
                params: { eventId },
            }),
            providesTags: ['EventPosts'],
        }),

        /**
         * Создать пост для события
         */
        createEventPost: builder.mutation<EventPost, CreateOrUpdateEventPostRequest>({
            query: ({ eventId, text }) => ({
                url: 'events/posts',
                method: 'POST',
                params: { eventId, text },
            }),
            invalidatesTags: ['EventPosts'],
        }),

        /**
         * Получить пост по ID
         */
        getEventPostById: builder.query<EventPost, string>({
            query: (postId) => `events/posts/${postId}`,
        }),

        /**
         * Обновить пост по ID
         */
        updateEventPost: builder.mutation<EventPost, { postId: string } & CreateOrUpdateEventPostRequest>({
            query: ({ postId, eventId, text }) => ({
                url: `events/posts/${postId}`,
                method: 'PUT',
                params: { eventId, text },
            }),
            invalidatesTags: ['EventPosts'],
        }),

        /**
         * Удалить пост по ID
         */
        deleteEventPost: builder.mutation<void, { postId: string; eventId: string }>({
            query: ({ postId, eventId }) => ({
                url: `events/posts/${postId}`,
                method: 'DELETE',
                params: { eventId },
            }),
            invalidatesTags: ['EventPosts'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetEventPostsQuery,
    useCreateEventPostMutation,
    useGetEventPostByIdQuery,
    useUpdateEventPostMutation,
    useDeleteEventPostMutation,
} = eventPostApi;
