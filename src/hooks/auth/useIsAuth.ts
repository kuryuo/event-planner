import { authStorage } from '@/utils/localStorage/authStorage';

export const useIsAuth = (): boolean => {
    return Boolean(authStorage.getToken());
};
