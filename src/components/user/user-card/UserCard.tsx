import React from 'react';
import ContactUserCard from '@/components/user/user-card/variants/ContactUserCard';
import InteractiveUserCard from '@/components/user/user-card/variants/InteractiveUserCard';
import CheckboxOnlyUserCard from '@/components/user/user-card/variants/CheckboxOnlyUserCard';

interface Props {
    name: string;
    role?: string;
    variant: 'basic' | 'contact' | 'interactive' | 'checkboxOnly';
    checked?: boolean;
    onToggle?: (checked: boolean) => void;
    onMenuClick?: () => void;
    avatarUrl?: string;
    onClick?: () => void;
    eventId: string;
    userId: string;
    isOrganizer?: boolean;
}

const UserCard: React.FC<Props> = (props) => {
    switch (props.variant) {
        case 'contact':
            return (
                <ContactUserCard name={props.name} role={props.role} avatarUrl={props.avatarUrl} />
            );
        case 'interactive':
            return (
                <InteractiveUserCard
                    name={props.name}
                    role={props.role}
                    avatarUrl={props.avatarUrl}
                    eventId={props.eventId}
                    userId={props.userId}
                    onClick={props.onClick}
                    isOrganizer={props.isOrganizer}
                />
            );
        case 'checkboxOnly':
            return (
                <CheckboxOnlyUserCard
                    name={props.name}
                    checked={props.checked}
                    onToggle={props.onToggle}
                    avatarUrl={props.avatarUrl}
                />
            );
        default:
            return null;
    }
};

export default UserCard;
