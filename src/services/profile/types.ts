export interface ProfileFormData {
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    telegram: string;
    city: string;
}

export interface ProfileFormProps {
    formData: ProfileFormData;
    onChange: (field: keyof ProfileFormData, value: string) => void;
}

export interface ProfileModalProps {
    firstName: string;
    lastName: string;
    isLogoutModalOpen: boolean;
    onProfileClick: () => void;
    onLogoutClick: () => void;
    onLogoutConfirm: () => void;
    onLogoutCancel: () => void;
}
