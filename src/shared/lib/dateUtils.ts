export const formatDateToMonthDay = (date: string): string => {
    const eventDate = new Date(date);
    const options = { day: 'numeric', month: 'long' } as const;
    return eventDate.toLocaleDateString('ru-RU', options);
};

export const formatTime = (date: string): string => {
    const eventDate = new Date(date);
    const hours = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};