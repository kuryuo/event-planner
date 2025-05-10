import React from 'react';
import ContactUserCard from '@/entities/user/ui/user-card/variants/ContactUserCard';
import InteractiveUserCard from '@/entities/user/ui/user-card/variants/InteractiveUserCard';
import CheckboxOnlyUserCard from '@/entities/user/ui/user-card/variants/CheckboxOnlyUserCard';

interface UserCardProps {
    name: string;
    role?: string;
    variant: 'basic' | 'contact' | 'interactive' | 'checkboxOnly';
    checked?: boolean;
    onToggle?: (checked: boolean) => void;
    onMenuClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = (props) => {
    switch (props.variant) {
        case 'contact':
            return <ContactUserCard name={props.name} role={props.role} />;
        case 'interactive':
            return <InteractiveUserCard name={props.name} role={props.role}/>;
        case 'checkboxOnly':
            return <CheckboxOnlyUserCard name={props.name} checked={props.checked} onToggle={props.onToggle} />;
        default:
            return null;
    }
};

export default UserCard;
