import React from 'react';
import styles from './EventSubscribersPreview.module.css';
import avatarPlaceholder from '@/assets/img/avatar.svg';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/utils/const';
import { useEventSubscribers } from '@/hooks/useEventSubscribers';

type Props = {
    eventId: string;
};

const EventSubscribersPreview: React.FC<Props> = ({ eventId }) => {
    const navigate = useNavigate();
    const { subscribers, isLoading, isError } = useEventSubscribers(eventId);

    const handleClick = () => {
        navigate(AppRoute.SUBSCRIBERS, { state: { eventId } });
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
                {subscribers.slice(0, 4).map((user: any, index: number) => (
                    <img
                        key={user.id || index}
                        src={user.avatarUrl || avatarPlaceholder}
                        alt={user.name || 'Аватар'}
                        className={styles.avatar}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventSubscribersPreview;
