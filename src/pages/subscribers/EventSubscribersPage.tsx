import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EventSubscribersPage.module.css';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Header from '@/components/layout/header/Header';
import InputField from '@/components/ui/input-field/InputField';
import UserRoleFilter from '@/components/user/user-role-filter/UserRoleFilter';
import UserCard from '@/components/user/user-card/UserCard';
import Button from '@/components/ui/button/Button';
import Arrow from '@/assets/img/arrow.svg';
import { AppRoute } from '@/utils/const';
import { getEventLink } from '@/utils/navigation';
import { useCurrentProfile, useEventSubscribers } from '@/hooks';
import { useEventRoles } from '@/hooks/roles/useEventRoles';
import { useChangeRoleModal } from '@/hooks/roles/useChangeRoleModal';
import ChangeRoleModal from '@/components/user/user-card/change-role-modal/ChangeRoleModal';
import { ProfileResponse } from '@/types';
import { useFilteredSubscribers } from '@/hooks/event/useFilteredSubscribers';

const EventSubscribersPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state?.eventId;
    const responsiblePersonId = location.state?.responsiblePersonId;
    const currentUserId = useCurrentProfile().id;
    const changeRoleModal = useChangeRoleModal();
    const eventTitle = location.state?.eventTitle || 'Подписчики события';
    const { filteredRoles, isLoading: rolesLoading, isError: rolesError } = useEventRoles(eventId);

    const [searchValue, setSearchValue] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const { subscribers, isLoading, isError } = useEventSubscribers(eventId);

    const filteredSubscribers = useFilteredSubscribers({
        subscribers: subscribers || [],
        nameSearch: searchValue,
        selectedRoles,
    });

    if (!eventId) {
        return <div>Не передан ID события</div>;
    }

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
                            onClick={() => {
                                console.log('[Назад]:', {
                                    eventId,
                                    responsiblePersonId,
                                    currentUserId,
                                    link: getEventLink(eventId, responsiblePersonId, currentUserId),
                                    isOrganizer: responsiblePersonId === currentUserId,
                                });

                                navigate(getEventLink(eventId, responsiblePersonId, currentUserId));
                            }}
                        />
                        <span className={styles.participants}>Участники</span>
                        <Button
                            label="Пригласить пользователя"
                            variant="border"
                            size="small"
                            onClick={() => navigate(AppRoute.INVITE)}
                        />
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
                        <div className={styles.grid}>
                            {isLoading && <p>Загрузка участников...</p>}
                            {isError && <p>Ошибка при загрузке участников</p>}
                            {!isLoading &&
                                !isError &&
                                filteredSubscribers.map((p: ProfileResponse, i: number) => (
                                    <UserCard
                                        key={p.id || i}
                                        name={p.name || p.email || 'Аноним'}
                                        role={p.eventRoleName || 'Участник'}
                                        variant="interactive"
                                        avatarUrl={p.avatarUrl}
                                        eventId={eventId}
                                        userId={p.id}
                                        onClick={() => changeRoleModal.open(p.id, p.eventRoleName)}
                                        isOrganizer={responsiblePersonId === currentUserId}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className={styles.filterBlock}>
                        {rolesLoading && <p>Загрузка ролей...</p>}
                        {rolesError && <p>Ошибка при загрузке ролей</p>}
                        {!rolesLoading && !rolesError && (
                            <UserRoleFilter
                                roles={filteredRoles}
                                selectedRoles={selectedRoles}
                                onChange={setSelectedRoles}
                            />
                        )}
                    </div>
                    <ChangeRoleModal
                        isOpen={changeRoleModal.isOpen}
                        onClose={changeRoleModal.close}
                        onConfirm={(newRole) =>
                            changeRoleModal.submit({ eventId, roleName: newRole })
                        }
                        eventId={eventId}
                        currentRole={changeRoleModal.currentRole}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventSubscribersPage;
