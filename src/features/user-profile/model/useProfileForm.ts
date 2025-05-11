import { useEffect, useState } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/shared/api/user/profileApi';
import { validateProfileForm } from '@/shared/lib/validation/profileValidation';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/shared/model/store/profileSlice';
import { authStorage } from '@/shared/lib/localStorage/authStorage';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const useProfileForm = () => {
    const [updateProfile] = useUpdateProfileMutation();
    const token = authStorage.getToken();
    const currentProfile = useSelector((state: RootState) => state.profile);
    const { data, isLoading, refetch } = useGetProfileQuery(undefined, {
        skip: !token,
    });

    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

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
            const id = data.id;
            const firstName = data.firstName || '';
            const lastName = data.lastName || '';

            const isSame =
                currentProfile.id === id &&
                currentProfile.firstName === firstName &&
                currentProfile.lastName === lastName;

            if (!isSame) {
                dispatch(setProfile({ id, firstName, lastName }));
            }

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
        }
    }, [data, isLoading, dispatch, currentProfile]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const errors = validateProfileForm(formData);

        if (Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0];
            setNotification({ type: 'error', message: firstError });
            return;
        }

        try {
            await updateProfile(formData).unwrap();
            await refetch();
            setNotification({ type: 'success', message: 'Данные профиля успешно обновлены' });
        } catch {
            setNotification({ type: 'error', message: 'Ошибка при обновлении профиля' });
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        isLoading,
        notification,
        setNotification,
        successMessage,
        errorMessage,
        clearMessages: () => {
            setSuccessMessage('');
            setErrorMessage('');
        },
    };
};