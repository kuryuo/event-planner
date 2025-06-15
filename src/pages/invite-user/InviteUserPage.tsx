import React from 'react';
import styles from './InviteUserPage.module.css';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Header from '@/components/layout/header/Header';
import InputField from "@/components/ui/input-field/InputField";
import Arrow from '@/assets/img/arrow.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import UserCard from "@/components/user/user-card/UserCard";
import { AppRoute } from "@/utils/const";
import { useInviteUsers } from '@/hooks/event/useInviteUsers';
import EmptyState from "@/components/ui/empty-state/EmptyState";
import Button from "@/components/ui/button/Button";
import { useSendInvites } from '@/hooks/invite/useSendInvites';
import ErrorToast from '@/components/ui/notification/ErrorToast';

const InviteUserPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventId, eventTitle, responsiblePersonId, avatarUrl } = location.state || {};
    const { sendInvites, toasts, removeToast } = useSendInvites(eventId);

    const {
        searchValue,
        setSearchValue,
        selectedIds,
        toggleUser,
        users,
        isLoading,
        isEmptySearch,
    } = useInviteUsers();

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title={eventTitle} />

                <div className={styles.topRow}>
                    <div className={styles.tabs}>
                        <img
                            src={Arrow}
                            className={styles.arrow}
                            alt="arrow"
                            onClick={() =>
                                navigate(AppRoute.SUBSCRIBERS, {
                                    state: {
                                        eventId,
                                        responsiblePersonId,
                                        eventTitle,
                                    },
                                })
                            }
                        />
                        <span className={styles.participants}>Пригласить участника</span>
                    </div>
                    <InputField
                        icon="search"
                        placeholder="Поиск"
                        value={searchValue}
                        onChange={setSearchValue}
                        size="medium"
                    />
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.participantsList}>
                        {isEmptySearch ? (
                            <EmptyState message="Начните искать людей" />
                        ) : isLoading ? (
                            <EmptyState message="Загрузка..." />
                        ) : users.length === 0 ? (
                            <EmptyState message="Пользователи не найдены" />
                        ) : (
                            <div className={styles.grid}>
                                {users.map((user) => (
                                    <UserCard
                                        key={user.id}
                                        name={`${user.lastName} ${user.firstName}`}
                                        variant="checkboxOnly"
                                        checked={selectedIds.includes(user.id)}
                                        onToggle={() => toggleUser(user.id)}
                                        eventId={eventId}
                                        userId={user.id}
                                        avatarUrl={user.avatarUrl}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button
                        label="Отправить приглашения"
                        variant="grey"
                        onClick={() => {
                            sendInvites(selectedIds);
                        }}
                    />
                </div>
            </div>
            {toasts.map((toast) => (
                <ErrorToast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};

export default InviteUserPage;
