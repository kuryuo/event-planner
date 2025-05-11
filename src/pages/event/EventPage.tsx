import React, { useState } from 'react';
import styles from './EventPage.module.css';

import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import EventTag from '@/entities/event/ui/event-tag/EventTag';
import EventDescription from '@/widgets/event-description/EventDescription';
import EventPhotosPreview from '@/widgets/event-photos-preview/EventPhotosPreview';
import EventNotifications from '@/widgets/event-notifications/EventNotifications';
import EventDetails from '@/widgets/event-details/EventDetails';
import EventSubscribersPreview from '@/widgets/event-subscribers-preview/EventSubscribersPreview';
import ContactsBlock from '@/widgets/event-contacts/EventContacts';
import Button from '@/shared/ui/button/Button';
import Modal from '@/shared/ui/modal/Modal';
import { useNavigate } from 'react-router-dom';

import SettingsIcon from '@/assets/img/settings.svg';
import {AppRoute} from "@/const";

type EventPageMode = 'participant' | 'organizer';

interface EventPageProps {
    mode: EventPageMode;
}

const EventPage: React.FC<EventPageProps> = ({ mode }) => {
    const navigate = useNavigate();
    const isOrganizer = mode === 'organizer';
    const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
    const handleFinish = () => {
        setIsFinishModalOpen(true);
    };

    const handleConfirmFinish = () => {
        setIsFinishModalOpen(false);
    };

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Масленница 2025" />

                <div className={styles.main}>
                    <div className={styles.leftColumn}>
                        <div className={styles.tags}>
                            <EventTag text="интерактивное" />
                            <EventTag text="IT" />
                            <EventTag text="внеучебное" />
                        </div>

                        <div className={styles.descriptionContainer}>
                            <EventDescription text="Вальпургиева ночь (от немецкого Walpurgisnacht) — ночь в канун дня поминания святой Вальпурги (1 мая). Этот день у древних германцев совпадает с языческим праздником «великий шабаш», который проходит на горе Брокен. Вальпургиева ночь (от немецкого Walpurgisnacht) — ночь в канун дня поминания святой Вальпурги (1 мая). Вальпургиева ночь (от немецкого Walpurgisnacht) — ночь в канун дня поминания святой Вальпурги (1 мая). " />
                        </div>

                        <div className={styles.galleryContainer}>
                            <EventPhotosPreview />
                        </div>

                        <EventNotifications />
                    </div>

                    <div className={styles.rightColumn}>
                        {isOrganizer ? (
                            <div className={styles.buttonGroup}>
                                <Button label="Перейти в чат" variant="default" size="small" />
                                <Button
                                    label="Завершить"
                                    variant="red"
                                    size="small"
                                    onClick={handleFinish}
                                />
                                <button className={styles.button} onClick={() => navigate(AppRoute.EDIT_EVENT)}>
                                    <img src={SettingsIcon} alt="Настройки" width={24} height={24} />
                                </button>
                            </div>
                        ) : (
                            <Button
                                label="Я пойду"
                                variant="default"
                                size="small"
                                className={styles.customButton}
                            />
                        )}

                        <EventDetails />
                        <EventSubscribersPreview />
                        <ContactsBlock />
                        <Modal
                            isOpen={isFinishModalOpen}
                            onClose={() => setIsFinishModalOpen(false)}
                            onConfirm={handleConfirmFinish}
                            title="Подтверждение завершения"
                            description='Вы уверены, что хотите завершить мероприятие “Масленница 2025”?'
                            primaryText="Завершить"
                            secondaryText="Отмена"
                            primaryType="red"
                            secondaryType="border"
                            buttonSize="small"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
