import React, { useEffect } from 'react';
import Modal from '@/components/ui/modal/Modal';
import { useRespondToInvite } from '@/hooks/invite/useRespondToInvite';
import { Invite } from '@/types/invite';

type InviteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    invite: Invite;
};

const InviteModal: React.FC<InviteModalProps> = ({
                                                     isOpen,
                                                     onClose,
                                                     invite,
                                                 }) => {
    const { respond } = useRespondToInvite();
    const { inviteId, communityName, inviterUsername } = invite;

    useEffect(() => {
        console.log('[InviteModal] Получен invite:', invite);
    }, [invite]);

    const handleAccept = async () => {
        await respond(inviteId, true);
        onClose();
    };

    const handleDecline = async () => {
        await respond(inviteId, false);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleAccept}
            onSecondary={handleDecline}
            title="Приглашение в сообщество"
            description={`${inviterUsername} приглашает вас вступить в "${communityName}"`}
            primaryText="Принять"
            secondaryText="Отклонить"
            primaryType="grey"
            secondaryType="border"
            buttonSize="small"
        />
    );
};

export default InviteModal;
