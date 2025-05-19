const STORAGE_KEY = 'userProfile';

export interface StoredProfile {
    id: string;
    firstName: string;
    lastName: string;
}

export const saveProfileToStorage = (profile: StoredProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};
