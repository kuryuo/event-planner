import React from 'react';
import ProfileForm from './ProfileForm';
import { ProfileFormData } from '@/features/user-profile/model/types';

interface Props {
    formData: ProfileFormData;
    onChange: (field: keyof ProfileFormData, value: string) => void;
}

const ProfileFormContainer: React.FC<Props> = ({ formData, onChange }) => {
    return <ProfileForm formData={formData} onChange={onChange} />;
};

export default ProfileFormContainer;
