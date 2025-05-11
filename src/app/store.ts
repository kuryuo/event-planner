import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '@/features/user-profile/model/profileSlice';
import eventReducer from '@/features/events/model/eventsSlice';
import { baseApi } from '@/shared/api/baseApi';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        events: eventReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
