import React from 'react';
import ProfileModal from './ProfileModal';
import { useProfileModal } from '@/hooks';

type Props = {
    onClose: () => void;
};

const ProfileModalContainer: React.FC<Props> = ({ onClose }) => {
    const {
        firstName,
        lastName,
        isLogoutModalOpen,
        handleProfileClick,
        handleLogoutClick,
        handleLogoutConfirm,
        handleLogoutCancel,
    } = useProfileModal(onClose);

    return (
        <ProfileModal
            firstName={firstName}
            lastName={lastName}
            isLogoutModalOpen={isLogoutModalOpen}
            onProfileClick={handleProfileClick}
            onLogoutClick={handleLogoutClick}
            onLogoutConfirm={handleLogoutConfirm}
            onLogoutCancel={handleLogoutCancel}
        />
    );
};

export default ProfileModalContainer;
