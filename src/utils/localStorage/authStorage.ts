const TOKEN_KEY = 'token';

export const authStorage = {
    setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    getToken: () => localStorage.getItem(TOKEN_KEY),
    clearToken: () => localStorage.removeItem(TOKEN_KEY),
};