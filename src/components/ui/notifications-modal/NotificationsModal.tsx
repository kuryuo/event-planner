import React, { useRef, useState } from 'react';
import styles from './NotificationsModal.module.css';
import CloseIcon from '@/assets/img/close.svg?react';
import { useInviteNotifications } from '@/hooks/notifications/useInviteNotifications';
import InviteModal from '@/components/event/invite-modal/InviteModal';
import { Invite } from '@/types/invite';
import { useMarkNotification } from '@/hooks/notifications/useMarkNotificationAsRead';
type Props = {
    onClose: () => void;
};

const NotificationsModal: React.FC<Props> = ({ onClose }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { invites, isLoading, isError } = useInviteNotifications();
    const { markNotificationAsRead, markAllNotificationsAsRead } = useMarkNotification();

    const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);

    const handleOpenInvite = async (invite: Invite) => {
        await markNotificationAsRead(invite.id);
        setSelectedInvite(invite);
        setInviteModalOpen(true);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} ref={ref}>
                <div className={styles.header}>
                    <h2 className={styles.modalTitle}>Уведомления</h2>
                    <button className={styles.close} onClick={onClose}>
                        <CloseIcon className={styles.close} />
                    </button>
                </div>

                <div className={styles.content}>
                    {isLoading && <p>Загрузка...</p>}
                    {isError && <p>Ошибка загрузки уведомлений</p>}
                    {!isLoading &&
                        invites.map((invite) => (
                            <div
                                key={invite.id}
                                className={`${styles.item} ${invite.isRead ? styles.read : ''}`}
                                onClick={() => handleOpenInvite(invite)}
                            >
                                <img src={invite.avatar} alt="" className={styles.avatar} />
                                <div>
                                    <div className={styles.title}>{invite.inviterUsername}</div>
                                    <div className={styles.message}>
                                        Приглашение в "{invite.communityName}"
                                    </div>
                                </div>
                            </div>
                        ))}

                    {!isLoading && invites.length > 0 && (
                        <div className={styles.readAll} onClick={markAllNotificationsAsRead}>
                            Прочитать все
                        </div>
                    )}
                </div>
            </div>

            {selectedInvite && (
                <InviteModal
                    isOpen={isInviteModalOpen}
                    onClose={() => setInviteModalOpen(false)}
                    invite={selectedInvite}
                />
            )}
        </div>
    );
};

export default NotificationsModal;
