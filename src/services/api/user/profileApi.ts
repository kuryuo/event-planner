import { baseApi } from '../baseApi';
import { ProfileResponse, UpdateProfileRequest } from '@/types';

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileResponse, void>({
            query: () => ({
                url: 'profile',
                method: 'GET',
            }),
            providesTags: ['Profile']
        }),
        updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
            query: (body) => {
                const formData = new FormData();

                formData.append('lastName', body.lastName);
                formData.append('firstName', body.firstName);
                formData.append('middleName', body.middleName);
                formData.append('phoneNumber', body.phoneNumber);
                formData.append('telegram', body.telegram);
                formData.append('city', body.city);

                if (body.file) {
                    formData.append('file', body.file);
                }

                return {
                    url: 'profile',
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['Profile']
        }),
    }),
    overrideExisting: false,
});

export const { useGetProfileQuery, useUpdateProfileMutation, useLazyGetProfileQuery } = profileApi;
