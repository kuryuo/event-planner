import { useEffect, useState } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/services/api/user/profileApi';
import { validateProfileForm } from '@/utils/validation/profileValidation';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/services/profile/profileSlice';
import { authStorage } from '@/utils/localStorage/authStorage';
import { useCurrentProfile } from '@/hooks';

type ProfileFormData = {
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    telegram: string;
    city: string;
    file?: File;
    avatarUrl?: string;
};

export const useProfileForm = () => {
    const [updateProfile] = useUpdateProfileMutation();
    const token = authStorage.getToken();
    const currentProfile = useCurrentProfile();
    const { data, isLoading, refetch } = useGetProfileQuery(undefined, {
        skip: !token,
    });

    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const [formData, setFormData] = useState<ProfileFormData>({
        firstName: '',
        lastName: '',
        middleName: '',
        phoneNumber: '',
        telegram: '',
        city: '',
        file: undefined,
    });

    const handleFileChange = (file: File | null) => {
        setFormData((prev) => ({ ...prev, file: file ?? undefined }));
    };

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading && data) {
            const id = data.id;
            const firstName = data.firstName || '';
            const lastName = data.lastName || '';
            const avatarUrl = data.avatarUrl
                ? `http://95.82.231.190:5002${data.avatarUrl}`
                : undefined;
            console.log('[PROFILE FORM] avatarUrl:', avatarUrl);

            const isSame =
                currentProfile.id === id &&
                currentProfile.firstName === firstName &&
                currentProfile.lastName === lastName &&
                currentProfile.avatarUrl === avatarUrl;

            if (!isSame) {
                const profilePayload = { id, firstName, lastName, avatarUrl };
                dispatch(setProfile(profilePayload));
                localStorage.setItem('userProfile', JSON.stringify(profilePayload));
            }

            setFormData({
                firstName,
                lastName,
                middleName: data.middleName || '',
                phoneNumber: data.phoneNumber || '',
                telegram: data.telegram || '',
                city: data.city || '',
                file: undefined,
                avatarUrl,
            });
        }
    }, [data, isLoading, dispatch, currentProfile]);

    const handleChange = (field: keyof ProfileFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
        handleFileChange,
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
