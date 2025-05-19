export const validateAuth = (
    mode: 'login' | 'register' | 'reset',
    email: string,
    password?: string
): string | null => {
    if (!email.trim()) {
        return 'Введите email';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Некорректный формат email';
    }

    if (mode !== 'reset' && !password?.trim()) {
        return 'Введите пароль';
    }

    if (mode === 'register' && password!.length < 6) {
        return 'Пароль должен содержать минимум 6 символов';
    }

    return null;
};
