import { baseApi } from '@/shared/api/baseApi';

export type Category = {
    id: string;
    name: string;
};

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => 'categories',
        }),
    }),
    overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoryApi;
