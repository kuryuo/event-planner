import React from 'react';
import ProfileForm from './ProfileForm';

interface Props {
    formData: any;
    onChange: (field: string, value: string) => void;
    formErrors: Record<string, string>;
}

const ProfileFormContainer: React.FC<Props> = ({ formData, onChange, formErrors }) => {
    return <ProfileForm formData={formData} onChange={onChange} formErrors={formErrors} />;
};

export default ProfileFormContainer;
