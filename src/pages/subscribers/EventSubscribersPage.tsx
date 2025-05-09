import React, {useState} from 'react';
import styles from './EventSubscribersPage.module.css';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import InputField from "@/shared/ui/input-field/InputField";
import UserRoleFilter from '@/features/manage-subscribers/ui/user-role-filter/UserRoleFilter';
import UserCard from '@/entities/user/ui/user-card/UserCard';
import Button from '@/shared/ui/button/Button';
import Arrow from '@/assets/img/arrow.svg';

const participants = Array(8).fill({
    name: 'Иванов Иван',
    role: 'Руководитель проекта',
});

const EventSubscribersPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Масленница 2025" />

                <div className={styles.topRow}>
                    <div className={styles.tabs}>
                        <img src={Arrow} className={styles.arrow} alt="arrow" />
                        <span className={styles.participants}>Участники</span>
                        <Button label = 'Пригласить пользователя' variant = 'border' size = 'small'/>
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
                            {participants.map((p, i) => (
                                <UserCard
                                    key={i}
                                    name={p.name}
                                    role={p.role}
                                    variant="interactive"
                                />
                            ))}
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
