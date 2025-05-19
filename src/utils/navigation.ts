import { AppRoute } from '@/utils/const';

/**
 * Путь к событию с учётом роли
 */
export function getEventLink(eventId: string, responsiblePersonId: string, currentUserId: string): string {
    const mode = responsiblePersonId === currentUserId ? 'organizer' : 'participant';
    return `${AppRoute.EVENT.replace(':eventId', eventId)}?mode=${mode}`;
}

/**
 * Путь к редактированию события
 */
export function getEditEventLink(eventId: string): string {
    return AppRoute.EDIT_EVENT.replace(':eventId', eventId);
}
