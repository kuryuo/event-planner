import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetEventByIdQuery } from '@/shared/api/event/eventApi';
import styles from './EventPage.module.css';
import { formatDateToMonthDay } from '@/shared/lib/dateUtils';

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
import SettingsIcon from '@/assets/img/settings.svg';
import { AppRoute } from '@/const';

const eventTypeMap: { [key: string]: string } = {
    open: 'Открытое',
    closed: 'Закрытое',
    private: 'Частное',
};

const EventPage: React.FC = () => {
    const navigate = useNavigate();
    const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

    const { eventId } = useParams<{ eventId: string }>();
    const { search } = useLocation();
    const { data: event, error, isLoading } = useGetEventByIdQuery(eventId || '');

    const isOrganizer = new URLSearchParams(search).get('mode') === 'organizer';

    const handleFinish = () => {
        setIsFinishModalOpen(true);
    };

    const handleConfirmFinish = () => {
        setIsFinishModalOpen(false);
    };

    const handleEditEvent = () => {
        if (eventId) {
            navigate(AppRoute.EDIT_EVENT.replace(':eventId', eventId));
        } else {
            console.error('eventId is undefined');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading event details</div>;
    }

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title={event?.name || 'Loading...'} />

                <div className={styles.main}>
                    <div className={styles.leftColumn}>
                        <div className={styles.tags}>
                            {event?.categories?.map((category: string, index: number) => (
                                <EventTag key={index} text={category} />
                            ))}
                        </div>

                        <div className={styles.descriptionContainer}>
                            <EventDescription
                                text={event?.description || 'No description available'}
                            />
                        </div>

                        <div className={styles.galleryContainer}>
                            <EventPhotosPreview />
                        </div>

                        <EventNotifications />
                    </div>

                    <div className={styles.rightColumn}>
                        {isOrganizer ? (
                            <div className={styles.buttonGroup}>
                                <Button label="Перейти в чат" variant="grey" size="small" />
                                <Button
                                    label="Завершить"
                                    variant="red"
                                    size="small"
                                    onClick={handleFinish}
                                />
                                <button className={styles.button} onClick={handleEditEvent}>
                                    <img
                                        src={SettingsIcon}
                                        alt="Настройки"
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            </div>
                        ) : (
                            <Button
                                label="Я пойду"
                                variant="grey"
                                size="small"
                                className={styles.customButton}
                            />
                        )}

                        <EventDetails
                            eventType={eventTypeMap[event?.eventType || ''] || 'Не указано'}
                            location={event?.location || 'Не указано'}
                            startDate={formatDateToMonthDay(event?.startDate || '')}
                            endDate={formatDateToMonthDay(event?.endDate || '')}
                        />

                        <EventSubscribersPreview />
                        <ContactsBlock />
                        <Modal
                            isOpen={isFinishModalOpen}
                            onClose={() => setIsFinishModalOpen(false)}
                            onConfirm={handleConfirmFinish}
                            title="Подтверждение завершения"
                            description={`Вы уверены, что хотите завершить мероприятие “${event?.name}”?`}
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
