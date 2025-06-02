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
import ErrorToast from '@/components/ui/notification/ErrorToast';

const EventSubscribersPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state?.eventId;
    const responsiblePersonId = location.state?.responsiblePersonId;
    const eventTitle = location.state?.eventTitle || 'Подписчики события';

    const currentUserId = useCurrentProfile().id;
    const changeRoleModal = useChangeRoleModal();

    const [searchValue, setSearchValue] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [showError, setShowError] = useState(true);

    const {
        filteredRoles,
        isLoading: rolesLoading,
        isError: rolesError
    } = useEventRoles(eventId);

    const {
        subscribers,
        isLoading: isSubscribersLoading,
        isError: isSubscribersError
    } = useEventSubscribers(eventId);

    const filteredSubscribers = useFilteredSubscribers({
        subscribers: subscribers || [],
        nameSearch: searchValue,
        selectedRoles,
    });

    const getErrorMessage = () => {
        if (isSubscribersError && rolesError) return 'Ошибка при загрузке участников и ролей';
        if (isSubscribersError) return 'Ошибка при загрузке участников';
        if (rolesError) return 'Ошибка при загрузке ролей';
        return '';
    };

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
                                navigate(getEventLink(eventId, responsiblePersonId, currentUserId));
                            }}
                        />
                        <span className={styles.participants}>Участники</span>
                        <Button
                            label="Пригласить пользователя"
                            variant="border"
                            size="small"
                            onClick={() =>
                                navigate(AppRoute.INVITE, {
                                    state: { eventId, eventTitle, responsiblePersonId },
                                })
                            }
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
                    {(isSubscribersError || rolesError) && showError && (
                        <ErrorToast
                            message={getErrorMessage()}
                            type="error"
                            onClose={() => setShowError(false)}
                        />
                    )}

                    <div className={styles.participantsList}>
                        {!isSubscribersLoading &&
                            !isSubscribersError &&
                            filteredSubscribers.length > 0 && (
                                <div className={styles.grid}>
                                    {filteredSubscribers.map((p: ProfileResponse, i: number) => (
                                        <UserCard
                                            key={p.id || i}
                                            name={p.name || p.email || 'Аноним'}
                                            role={p.role || 'Участник'}
                                            variant="interactive"
                                            avatarUrl={p.avatarUrl}
                                            eventId={eventId}
                                            userId={p.id}
                                            onClick={() => changeRoleModal.open(p.id, p.role)}
                                            isOrganizer={responsiblePersonId === currentUserId}
                                        />
                                    ))}
                                </div>
                            )}
                    </div>

                    <div className={styles.filterBlock}>
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
