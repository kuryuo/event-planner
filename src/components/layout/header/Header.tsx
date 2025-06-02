import { useRef, useState } from 'react';
import styles from './Header.module.css';
import notificationIcon from '@/assets/img/notification.svg';
import NotificationsModal from '@/components/ui/notifications-modal/NotificationsModal';
import ProfileModalContainer from '@/components/user/profile-modal/ProfileModalContainer';
import { useClickOutside, useCurrentProfile } from '@/hooks';
import UserAvatar from '@/components/user/user-avatar/UserAvatar';
import { useInviteNotifications } from '@/hooks/notifications/useInviteNotifications';

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
    const [showModal, setShowModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const { avatarUrl } = useCurrentProfile();
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const { hasUnread } = useInviteNotifications();

    useClickOutside(notificationRef, () => showModal && setShowModal(false));
    useClickOutside(profileRef, () => showProfile && setShowProfile(false));

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.right}>
                <div className={styles.notificationWrapper} ref={notificationRef}>
                    <img
                        src={notificationIcon}
                        alt="Уведомления"
                        className={styles.icon}
                        onClick={() => setShowModal(true)}
                    />
                    {hasUnread && <span className={styles.indicator} />}
                    {showModal && <NotificationsModal onClose={() => setShowModal(false)} />}
                </div>

                <div style={{ position: 'relative' }} ref={profileRef}>
                    <UserAvatar
                        avatarUrl={avatarUrl}
                        alt="Профиль"
                        className={styles.avatar}
                        onClick={() => setShowProfile(true)}
                    />

                    {showProfile && (
                        <ProfileModalContainer
                            onClose={() => setShowProfile(false)}
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
