import React from 'react';
import styles from './EventSubscribersPreview.module.css';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/utils/const';
import { useEventSubscribers } from '@/hooks';
import UserAvatar from '@/components/user/user-avatar/UserAvatar';

type Props = {
    eventId: string;
    eventTitle: string;
};

const EventSubscribersPreview: React.FC<Props> = ({ eventId, eventTitle }) => {
    const navigate = useNavigate();
    const { subscribers, isLoading, isError } = useEventSubscribers(eventId);

    const handleClick = () => {
        navigate(AppRoute.SUBSCRIBERS, { state: { eventId, eventTitle, } });
    };

    if (isError) return null;

    return (
        <div className={styles.subscribers}>
            <p className={styles.title} onClick={handleClick}>
                Подписчики
                {!isLoading && (
                    <span className={styles.participantCount}>{subscribers.length}</span>
                )}
            </p>

            <div className={styles.avatars}>
                {subscribers.slice(0, 4).map((user: any) => (
                    <UserAvatar
                        key={user.id}
                        avatarUrl={user.avatarUrl}
                        alt={user.name}
                        className={styles.avatar}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventSubscribersPreview;
