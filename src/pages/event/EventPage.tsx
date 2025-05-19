import React, { useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetEventByIdQuery } from '@/services/api/event/eventApi';
import { useUploadEventPhotos } from '@/hooks/useUploadEventPhotos';
import styles from './EventPage.module.css';

import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import EventTag from '@/components/event-tag/EventTag';
import EventDescription from '@/components/event-description/EventDescription';
import EventPhotosPreview from '@/components/event-photos-preview/EventPhotosPreview';
import EventPost from '@/components/event-post/EventPost';
import EventDetails from '@/components/event-details/EventDetails';
import EventSubscribersPreview from '@/components/event-subscribers-preview/EventSubscribersPreview';
import ContactsBlock from '@/components/event-contacts/EventContacts';
import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
import SettingsIcon from '@/assets/img/settings.svg';
import { AppRoute } from '@/utils/const';
import {RootState} from "@/app/store";
import {useSelector} from "react-redux";
import { useEventSubscription } from '@/hooks/useEventSubscription';

const EventPage: React.FC = () => {
    const navigate = useNavigate();
    const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

    const { eventId } = useParams<{ eventId: string }>();
    const { search } = useLocation();
    const { data: event, error, isLoading } = useGetEventByIdQuery(eventId || '');
    const currentUserId = useSelector((state: RootState) => state.profile.id);
    const initialSubscribed = !!event?.subscribers?.includes(currentUserId);
    const { isSubscribed, handleToggleSubscription } = useEventSubscription(eventId || '', initialSubscribed);

    const isOrganizer = new URLSearchParams(search).get('mode') === 'organizer';

    const handleFinish = () => {
        setIsFinishModalOpen(true);
    };

    const handleConfirmFinish = () => {
        setIsFinishModalOpen(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { handleUpload } = useUploadEventPhotos(eventId || '');

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
                            <EventPhotosPreview
                                eventId={eventId || ''}
                                responsiblePersonId={event?.responsiblePersonId}
                            />

                            {isOrganizer && (
                                <div className={styles.addPhotoBlock}>
                                    <Button
                                        label="Загрузить фото"
                                        variant="border"
                                        size="small"
                                        onClick={() => fileInputRef.current?.click()}
                                    />
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleUpload(e.target.files)}
                                    />
                                </div>
                            )}
                        </div>

                        <EventPost />
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
                                label={isSubscribed ? 'Я не пойду' : 'Я пойду'}
                                variant={isSubscribed ? 'red' : 'grey'}
                                size="small"
                                className={styles.customButton}
                                onClick={handleToggleSubscription}
                            />
                        )}

                        <EventDetails event={event} />

                        <EventSubscribersPreview eventId={eventId || ''} />
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
