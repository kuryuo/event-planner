import { EventInfoFormData, PositioningFormData } from '@/services/events/types';

interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export const validateCreateEvent = (
    eventInfo: EventInfoFormData | null,
    positioning: PositioningFormData | null
): ValidationResult => {
    if (!eventInfo || !positioning) {
        return { isValid: false, message: 'Все поля должны быть заполнены' };
    }

    const { name, startDate, endDate, location, format, eventType } = eventInfo;
    const { categories, roles } = positioning;

    if (!name.trim()) return { isValid: false, message: 'Название обязательно' };
    if (!startDate) return { isValid: false, message: 'Дата начала обязательна' };
    if (!endDate) return { isValid: false, message: 'Дата окончания обязательна' };
    if (new Date(startDate) > new Date(endDate)) {
        return { isValid: false, message: 'Дата начала не может быть позже даты окончания' };
    }
    if (!location.trim()) return { isValid: false, message: 'Место проведения обязательно' };
    if (!format) return { isValid: false, message: 'Выберите формат мероприятия' };
    if (!eventType) return { isValid: false, message: 'Выберите тип мероприятия' };

    if (!categories.length) return { isValid: false, message: 'Добавьте хотя бы одну категорию' };
    if (!roles.length) return { isValid: false, message: 'Добавьте хотя бы одну роль участника' };

    return { isValid: true };
};
