import { baseApi } from '../baseApi';
import { Invite, SendInviteRequest, RespondInviteRequest } from '@/types';

export const inviteApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Отправить приглашение пользователю на участие в событии
         */
        sendInvite: builder.mutation<Invite, SendInviteRequest>({
            query: ({ eventId, invitedId }) => ({
                url: 'invites/send',
                method: 'POST',
                params: { eventId, invitedId },
            }),
            invalidatesTags: ['Invites'],
        }),

        /**
         * Ответить на приглашение (принять или отклонить)
         */
        respondToInvite: builder.mutation<void, RespondInviteRequest>({
            query: ({ inviteId, accept }) => ({
                url: `invites/${inviteId}/respond`,
                method: 'POST',
                params: { accept },
            }),
            invalidatesTags: ['Invites'],
        }),

        /**
         * Получить список всех ожидающих приглашений
         */
        getPendingInvites: builder.query<Invite[], void>({
            query: () => ({
                url: 'invites/pending',
                method: 'GET',
            }),
            providesTags: ['Invites'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useSendInviteMutation,
    useRespondToInviteMutation,
    useGetPendingInvitesQuery,
} = inviteApi;
