import React from 'react';
import ContactUserCard from '@/components/user-card/variants/ContactUserCard';
import InteractiveUserCard from '@/components/user-card/variants/InteractiveUserCard';
import CheckboxOnlyUserCard from '@/components/user-card/variants/CheckboxOnlyUserCard';

interface Props {
    name: string;
    role?: string;
    variant: 'basic' | 'contact' | 'interactive' | 'checkboxOnly';
    checked?: boolean;
    onToggle?: (checked: boolean) => void;
    onMenuClick?: () => void;
}

const UserCard: React.FC<Props> = (props) => {
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
