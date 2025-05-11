const STORAGE_KEY = 'userProfile';

export interface StoredProfile {
    id: string;
    firstName: string;
    lastName: string;
}

export const saveProfileToStorage = (profile: StoredProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

export const loadProfileFromStorage = (): StoredProfile | null => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw);

        if (
            typeof parsed.id === 'string' &&
            typeof parsed.firstName === 'string' &&
            typeof parsed.lastName === 'string'
        ) {
            return parsed;
        }

        return null;
    } catch {
        return null;
    }
};

export const clearProfileFromStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};
