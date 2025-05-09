import React, {useState} from 'react';
import styles from './InviteUserPage.module.css';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import InputField from "@/shared/ui/input-field/InputField";
import Arrow from '@/assets/img/arrow.svg';
import UserCard from "@/entities/user/ui/user-card/UserCard";

const participants = Array(8).fill({
    name: 'Иванов Иван',
    role: 'Руководитель проекта',
});

const InviteUserPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Масленница 2025" />

                <div className={styles.topRow}>
                    <div className={styles.tabs}>
                        <img src={Arrow} className={styles.arrow} alt="arrow" />
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
                        <div className={styles.grid}>
                            {participants.map((p, i) => (
                                <UserCard
                                    key={i}
                                    name={p.name}
                                    variant='checkboxOnly'
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InviteUserPage;
