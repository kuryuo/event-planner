import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

/**
 * Возвращает текущего пользователя
 */
export const useCurrentProfile = () => {
    return useSelector((state: RootState) => state.profile);
};