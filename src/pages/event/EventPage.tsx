import React, { useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetEventByIdQuery } from '@/services/api/event/eventApi';
import styles from './EventPage.module.css';

import Sidebar from '@/components/layout/sidebar/Sidebar';
import ErrorToast from "@/components/ui/notification/ErrorToast";
import Header from '@/components/layout/header/Header';
import EventTag from '@/components/ui/event-tag/EventTag';
import EventDescription from '@/components/ui/event-description/EventDescription';
import EventActionsPanel from '@/components/ui/event-actions-panel/EventActionsPanel';
import EventPhotosPreview from '@/components/event/event-photos-preview/EventPhotosPreview';
import EventPost from '@/components/ui/event-post/EventPost';
import EventDetails from '@/components/ui/event-details/EventDetails';
import EventSubscribersPreview from '@/components/event/event-subscribers-preview/EventSubscribersPreview';
import ContactsBlock from '@/components/event/event-contacts/EventContacts';
import Button from '@/components/ui/button/Button';
import Modal from '@/components/ui/modal/Modal';
import { getEditEventLink } from '@/utils/navigation';
import {
    useUploadEventPhotos,
    useEventSubscriptionStatus
} from '@/hooks';

const EventPage: React.FC = () => {
    const navigate = useNavigate();
    const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

    const { eventId } = useParams<{ eventId: string }>();
    const { search } = useLocation();

    const { data: event, error, isLoading } = useGetEventByIdQuery(eventId || '');

    const {
        isSubscribersLoading,
        isSubscribersError,
        isSubscribed,
        handleToggleSubscription,
    } = useEventSubscriptionStatus(eventId);

    const isOrganizer = new URLSearchParams(search).get('mode') === 'organizer';

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { handleUpload } = useUploadEventPhotos(eventId || '');

    const handleFinish = () => setIsFinishModalOpen(true);
    const handleConfirmFinish = () => setIsFinishModalOpen(false);
    const handleEditEvent = () => navigate(getEditEventLink(eventId!));

    if (isLoading || isSubscribersLoading) {
        return <div>Загрузка...</div>;
    }

    if (error || isSubscribersError) {
        return (
            <ErrorToast
                message="Ошибка загрузки данных мероприятия"
                type="error"
                onClose={() => {}}
            />
        );
    }

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title={event?.name || 'Загрузка...'} />

                <div className={styles.main}>
                    <div className={styles.leftColumn}>
                        <div className={styles.tags}>
                            {event?.categories?.map((category: string, index: number) => (
                                <EventTag key={index} text={category} />
                            ))}
                        </div>

                        <div className={styles.descriptionContainer}>
                            <EventDescription text={event?.description || 'Описание отсутствует'} />
                        </div>

                        <div className={styles.galleryContainer}>
                            <EventPhotosPreview
                                eventId={eventId || ''}
                                responsiblePersonId={event!.responsiblePersonId}
                                eventTitle={event?.name || ''}
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
                        <EventActionsPanel
                            isOrganizer={isOrganizer}
                            isSubscribed={isSubscribed}
                            onToggleSubscription={handleToggleSubscription}
                            onFinish={handleFinish}
                            onEdit={handleEditEvent}
                        />

                        <EventDetails event={event!} />

                        <EventSubscribersPreview eventId={eventId || ''} eventTitle={event?.name || ''} responsiblePersonId={event?.responsiblePersonId || ''}/>
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
