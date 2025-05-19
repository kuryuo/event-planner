import { createSlice } from '@reduxjs/toolkit';
import { eventApi } from '@/services/api/event/eventApi';
import {Event} from "@/types";

interface EventState {
    events: Event[];
    selectedEventId: string | null;
}

const initialState: EventState = {
    events: [],
    selectedEventId: null,
};

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setSelectedEventId(state, action) {
            state.selectedEventId = action.payload;
        },
    },
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

export const { setSelectedEventId } = eventSlice.actions;

export default eventSlice.reducer;
