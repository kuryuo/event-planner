import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EventSubscribersPage.module.css';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import InputField from "@/shared/ui/input-field/InputField";
import UserRoleFilter from '@/features/manage-subscribers/ui/user-role-filter/UserRoleFilter';
import UserCard from '@/entities/user/ui/user-card/UserCard';
import Button from '@/shared/ui/button/Button';
import Arrow from '@/assets/img/arrow.svg';
import { AppRoute } from "@/const";
import { useEventSubscribers } from '@/features/manage-subscribers/model/useEventSubscribers';
import {RootState} from "@/app/store";
import {useSelector} from "react-redux";

const EventSubscribersPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state?.eventId;
    const responsiblePersonId = location.state?.responsiblePersonId;
    const currentUserId = useSelector((state: RootState) => state.profile.id);

    const [searchValue, setSearchValue] = useState('');

    const { subscribers, isLoading, isError } = useEventSubscribers(eventId);

    if (!eventId) {
        return <div>Не передан ID события</div>;
    }

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Масленница 2025" />

                <div className={styles.topRow}>
                    <div className={styles.tabs}>
                        <img
                            src={Arrow}
                            className={styles.arrow}
                            alt="arrow"
                            onClick={() => {
                                const mode = responsiblePersonId === currentUserId ? 'organizer' : 'participant';
                                navigate(`${AppRoute.EVENT.replace(':eventId', eventId)}?mode=${mode}`);
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
                            {!isLoading && !isError &&
                                subscribers.map((p: any, i: number) => {
                                    const fullName = [p.lastName, p.firstName, p.middleName]
                                        .filter(Boolean)
                                        .join(' ')
                                        .trim();

                                    return (
                                        <UserCard
                                            key={p.id || i}
                                            name={fullName || p.email}
                                            role={p.eventRole || 'Участник'}
                                            variant="interactive"
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <div className={styles.filterBlock}>
                        <UserRoleFilter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventSubscribersPage;
