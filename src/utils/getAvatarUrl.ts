import avatar from '@/assets/img/avatar.svg?url';
import { API_BASE_URL } from '@/utils/const';

export const getAvatarUrl = (rawUrl?: string): string => {
    if (!rawUrl) return avatar;
    if (rawUrl.startsWith('http') || rawUrl.startsWith('blob:')) return rawUrl;
    return `${API_BASE_URL}${rawUrl}`;
};
