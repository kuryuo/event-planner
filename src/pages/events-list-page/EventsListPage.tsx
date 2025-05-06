import React from 'react';
import styles from './EventsListPage.module.css';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import EventsToolbar from '@/components/events-toolbar/EventsToolbar';
import EventListItem from "@/components/event-list-item/EventListItem";

const EventsListPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Календарь" />
                <EventsToolbar />
                <EventListItem
                    day="18 марта"
                    time="15:00 - 16:00"
                    title="Воркшоп. Создание презентаций"
                />
                <EventListItem
                    day="21 марта"
                    time="13:00 - 15:00"
                    title="Мастер-класс. Актёрское мастерство"
                    color="#ffd9b3"
                />
                <EventListItem
                    day="23 марта"
                    time="10:00 - 11:30"
                    title="Тренинг. Командная работа"
                    color="#b3e5fc"
                />
                <EventListItem
                    day="25 марта"
                    time="17:00 - 18:00"
                    title="Встреча с наставником"
                    color="#ffcccb"
                />
                <EventListItem
                    day="26 марта"
                    time="19:00 - 21:00"
                    title="Киноночь. Документальные фильмы"
                    color="#e0b0ff"
                />
            </div>
        </div>
    );
};

export default EventsListPage;
