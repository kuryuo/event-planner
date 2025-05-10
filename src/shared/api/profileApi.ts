import { baseApi } from './baseApi';
import { ProfileResponse, UpdateProfileRequest } from './types';

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileResponse, void>({
            query: () => ({
                url: 'profile',
                method: 'GET',
            }),
        }),
        updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
            query: (body) => ({
                url: 'profile',
                method: 'PUT',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetProfileQuery, useUpdateProfileMutation, useLazyGetProfileQuery } = profileApi;
