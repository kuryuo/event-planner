import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    firstName: string;
    lastName: string;
}

const initialState: ProfileState = {
    firstName: '',
    lastName: '',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<ProfileState>) {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        clearProfile(state) {
            state.firstName = '';
            state.lastName = '';
        },
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
