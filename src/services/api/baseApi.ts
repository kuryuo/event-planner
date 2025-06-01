import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authStorage } from '@/utils/localStorage/authStorage';
import { API_BASE_PATH } from '@/utils/const';

export const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Profile', 'Events', 'Subscribers', 'Photos', 'EventPosts', 'Invites', 'Notifications', 'Contacts'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_PATH,
        prepareHeaders: (headers) => {
            const token = authStorage.getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        responseHandler: async (response) => {
            const contentType = response.headers.get('Content-Type');
            if (contentType?.includes('application/json')) {
                return response.json();
            }
            return response.text();
        }
    }),
    endpoints: () => ({}),
});
