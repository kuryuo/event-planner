import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '@/shared/model/store/profileSlice';
import { baseApi } from '@/shared/api/baseApi';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
