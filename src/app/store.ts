import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '@/services/profile/profileSlice';
import eventReducer from '@/services/events/eventsSlice';
import { baseApi } from '@/services/api/baseApi';

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
