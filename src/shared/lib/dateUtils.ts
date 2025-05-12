export const formatDateToMonthDay = (date: Date): string => {
    const options = { day: 'numeric', month: 'long' } as const;
    return date.toLocaleDateString('ru-RU', options);
};

export const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};
