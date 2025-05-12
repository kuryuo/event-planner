import { createSlice } from '@reduxjs/toolkit';
import { eventApi } from '@/shared/api/event/eventApi';

export interface Event {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    format: string;
    eventType: string;
    responsiblePersonId: string;
    maxParticipants: number;
    roles: string[];
    categories: string[];
}

interface EventState {
    events: Event[];
}

const initialState: EventState = {
    events: [],
};

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            eventApi.endpoints.getEvents.matchFulfilled,
            (state, action) => {
                state.events = action.payload;
            }
        );
        builder.addMatcher(
            eventApi.endpoints.createEvent.matchFulfilled,
            (state, action) => {
                state.events.push(action.payload);
            }
        );
    },
});

export default eventSlice.reducer;
