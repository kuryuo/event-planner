import { BaseEvent } from './events';
import { BaseProfile } from './profile';

export interface EventInfoFormData
    extends Omit<BaseEvent, 'startDate' | 'endDate' | 'maxParticipants' | 'roles' | 'categories'> {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
}

export interface PositioningFormData {
    categories: string[];
    roles: string[];
    maxParticipants: number | null;
}

export interface ProfileFormProps {
    formData: BaseProfile;
    onChange: (field: keyof BaseProfile, value: string) => void;
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
