import React from 'react';
import Modal from '@/components/ui/modal/Modal';

type InviteData = {
    invite_id: string;
    community_name: string;
    inviter_username: string;
};

type InviteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAccept: (inviteId: string) => void;
    onDecline: (inviteId: string) => void;
    invite: InviteData;
};

const InviteModal: React.FC<InviteModalProps> = ({
                                                     isOpen,
                                                     onClose,
                                                     onAccept,
                                                     onDecline,
                                                     invite,
                                                 }) => {
    const { invite_id, community_name, inviter_username } = invite;

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onDecline(invite_id);
                onClose();
            }}
            onConfirm={() => {
                onAccept(invite_id);
                onClose();
            }}
            title="Приглашение в сообщество"
            description={`${inviter_username} приглашает вас вступить в "${community_name}"`}
            primaryText="Принять"
            secondaryText="Отклонить"
            primaryType="grey"
            secondaryType="border"
        />
    );
};

export default InviteModal;
