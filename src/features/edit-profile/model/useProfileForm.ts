import { useEffect, useState } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/shared/api/profileApi';
import { validateProfileForm } from '@/shared/lib/validation/profileValidation';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/shared/model/store/profileSlice';

export const useProfileForm = () => {
    const { data, isLoading, refetch } = useGetProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        phoneNumber: '',
        telegram: '',
        city: '',
        educationalInstitution: '',
        courseNumber: 1,
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading && data) {
            const firstName = data.firstName || '';
            const lastName = data.lastName || '';
            setFormData({
                firstName,
                lastName,
                middleName: data.middleName || '',
                phoneNumber: data.phoneNumber || '',
                telegram: data.telegram || '',
                city: data.city || '',
                educationalInstitution: data.educationalInstitution || '',
                courseNumber: data.courseNumber || 1,
            });
            dispatch(setProfile({ firstName, lastName }));
        }
    }, [data, isLoading, dispatch]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const errors = validateProfileForm(formData);

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await updateProfile(formData).unwrap();
            await refetch();
            setSuccessMessage('Данные профиля успешно обновлены');
            setErrorMessage('');
            setFormErrors({});
        } catch {
            setErrorMessage('Ошибка при обновлении профиля');
            setSuccessMessage('');
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        formErrors,
        isLoading,
        successMessage,
        errorMessage,
        clearMessages: () => {
            setSuccessMessage('');
            setErrorMessage('');
        },
    };
};
