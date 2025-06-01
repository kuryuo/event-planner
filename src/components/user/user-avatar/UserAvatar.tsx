import React from 'react';
import { getAvatarUrl } from '@/utils/getAvatarUrl';
import avatar from '@/assets/img/avatar.svg';
import styles from './UserAvatar.module.css';

type Props = {
    avatarUrl?: string;
    alt?: string;
    className?: string;
    onClick?: () => void;
};

const UserAvatar: React.FC<Props> = ({ avatarUrl, alt = 'Аватар', className, onClick }) => {
    return (
        <img
            src={getAvatarUrl(avatarUrl)}
            alt={alt}
            className={className || styles.avatar}
            onClick={onClick}
            onError={(e) => {
                (e.target as HTMLImageElement).src = avatar;
            }}
        />
    );
};

export default UserAvatar;