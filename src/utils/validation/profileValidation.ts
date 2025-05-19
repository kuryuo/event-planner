export const validateProfileForm = (formData: {
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    telegram: string;
    city: string;
}) => {
    const errors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.firstName.trim()) {
        errors.firstName = 'Имя обязательно';
    }

    if (!formData.lastName.trim()) {
        errors.lastName = 'Фамилия обязательна';
    }

    if (formData.phoneNumber && !/^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = 'Некорректный номер телефона';
    }

    if (formData.telegram && !/^@[\w\d_]{4,32}$/.test(formData.telegram)) {
        errors.telegram = 'Неверный формат @username';
    }

    return errors;
};
