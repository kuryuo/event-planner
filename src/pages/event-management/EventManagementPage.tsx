import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './EventManagementPage.module.css';

import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import EventInfoFormContainer from '@/components/event-info-form/EventInfoFormContainer';
import PositioningFormContainer from '@/components/positioning-form/PositioningFormContainer';
import FormButtons from '@/components/form-buttons/FormButtons';
import Modal from '@/components/modal/Modal';
import Button from '@/components/button/Button';
import Notification from '@/components/notification/Notification';

import { useEventManagement } from '@/hooks/useEventManagement';

interface EventManagementPageProps {
    isEditMode?: boolean;
}

const EventManagementPage: React.FC<EventManagementPageProps> = ({ isEditMode = false }) => {
    const { eventId } = useParams<{ eventId: string }>();
    const {
        handleSubmit,
        handleCancel,
        handleConfirmCancel,
        handleConfirmDelete,
        notification,
        isLoading,
        error,
        event,
        setEventInfo,
        setPositioning,
        isModalOpen,
        setIsModalOpen,
    } = useEventManagement(eventId, isEditMode);

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
                <Header
                    title={isEditMode ? 'Редактирование мероприятия' : 'Создание мероприятия'}
                />

                <div className={styles.formsContainer}>
                    <EventInfoFormContainer
                        key={isEditMode ? 'edit' : 'create'}
                        onChange={setEventInfo}
                        initialValues={isEditMode ? event : undefined}
                    />
                    <div className={styles.rightColumn}>
                        <PositioningFormContainer
                            onChange={setPositioning}
                            initialValues={isEditMode ? event : undefined}
                        />
                        {isEditMode && (
                            <Button
                                variant="red"
                                label="Удалить"
                                className={styles.deleteButton}
                                onClick={() => setIsModalOpen(true)}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.formActionsContainer}>
                    <FormButtons
                        primaryText={isEditMode ? 'Сохранить изменения' : 'Создать мероприятие'}
                        secondaryText="Отмена"
                        onPrimaryClick={handleSubmit}
                        onSecondaryClick={handleCancel}
                    />
                </div>

                {!isEditMode && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleConfirmCancel}
                        title="Подтверждение отмены"
                        description="Вы уверены, что хотите отменить создание мероприятия?"
                        primaryText="Удалить"
                        secondaryText="Продолжить"
                        primaryType="red"
                        secondaryType="border"
                        buttonSize="small"
                    />
                )}

                {isEditMode && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleConfirmDelete}
                        title="Подтверждение удаления"
                        description="Вы уверены, что хотите удалить мероприятие?"
                        primaryText="Удалить"
                        secondaryText="Отмена"
                        primaryType="red"
                        secondaryType="border"
                        buttonSize="small"
                    />
                )}

                {notification && (
                    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
                        <Notification
                            type={notification.type}
                            message={notification.message}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventManagementPage;
