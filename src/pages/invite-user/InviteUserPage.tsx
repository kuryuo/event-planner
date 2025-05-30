import React, {useState} from 'react';
import styles from './InviteUserPage.module.css';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Header from '@/components/layout/header/Header';
import InputField from "@/components/ui/input-field/InputField";
import Arrow from '@/assets/img/arrow.svg';
import { useNavigate } from 'react-router-dom';
import UserCard from "@/components/user/user-card/UserCard";
import {AppRoute} from "@/utils/const";

const participants = Array(8).fill({
    name: 'Иванов Иван',
    role: 'Руководитель проекта',
});

const InviteUserPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Масленница 2025" />

                <div className={styles.topRow}>
                    <div className={styles.tabs}>
                        <img src={Arrow} className={styles.arrow} alt="arrow" onClick={() => navigate(AppRoute.SUBSCRIBERS)}/>
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
