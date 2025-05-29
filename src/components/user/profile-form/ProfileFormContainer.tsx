import React from 'react';
import ProfileForm from './ProfileForm';
import { BaseProfile } from '@/types';

interface Props {
    formData: BaseProfile;
    onChange: (field: keyof BaseProfile, value: string) => void;
}

const ProfileFormContainer: React.FC<Props> = ({ formData, onChange }) => {
    return <ProfileForm formData={formData} onChange={onChange} />;
};

export default ProfileFormContainer;
