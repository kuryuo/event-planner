import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const savedProfile = localStorage.getItem('userProfile');
const parsedProfile = savedProfile ? JSON.parse(savedProfile) : null;

interface ProfileState {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
}

const initialState: ProfileState = parsedProfile || {
    id: '',
    firstName: '',
    lastName: '',
    avatarUrl: undefined,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<ProfileState>) {
            state.id = action.payload.id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.avatarUrl = action.payload.avatarUrl;
        },
        clearProfile(state) {
            state.id = '';
            state.firstName = '';
            state.lastName = '';
        },
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
