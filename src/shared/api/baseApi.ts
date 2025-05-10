import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authStorage } from '@/shared/lib/authStorage';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://95.82.231.190:5002/api/',
        prepareHeaders: (headers) => {
            const token = authStorage.getToken();

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: () => ({}),
});
