import { useRef, useState } from 'react';
import styles from './Header.module.css';
import notificationIcon from '@/assets/img/notification.svg';
import avatar from '@/assets/img/avatar.svg';
import NotificationsModal from '@/widgets/header/NotificationsModal';
import ProfileModalContainer from '@/features/user-profile/ui/profile-modal/ProfileModalContainer';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
    const [showModal, setShowModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useClickOutside(notificationRef, () => showModal && setShowModal(false));
    useClickOutside(profileRef, () => showProfile && setShowProfile(false));

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.right}>
                <div ref={notificationRef}>
                    <img
                        src={notificationIcon}
                        alt="Уведомления"
                        className={styles.icon}
                        onClick={() => setShowModal(true)}
                    />
                    {showModal && <NotificationsModal onClose={() => setShowModal(false)} />}
                </div>

                <div style={{ position: 'relative' }} ref={profileRef}>
                    <img
                        src={avatar}
                        alt="Профиль"
                        className={styles.avatar}
                        onClick={() => setShowProfile(true)}
                    />
                    {showProfile && <ProfileModalContainer onClose={() => setShowProfile(false)} />}
                </div>
            </div>
        </header>
    );
};

export default Header;
