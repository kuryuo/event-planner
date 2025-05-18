import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authStorage } from '@/shared/lib/localStorage/authStorage';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://smarteventmanager.ru/api',
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
