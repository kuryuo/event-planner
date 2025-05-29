import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './EventManagementPage.module.css';

import Sidebar from '@/components/layout/sidebar/Sidebar';
import Header from '@/components/layout/header/Header';
import EventInfoFormContainer from '@/components/event/event-info-form/EventInfoFormContainer';
import PositioningFormContainer from '@/components/event/positioning-form/PositioningFormContainer';
import FormButtons from '@/components/ui/form-buttons/FormButtons';
import Modal from '@/components/ui/modal/Modal';
import Button from '@/components/ui/button/Button';

import { useEventManagement } from '@/hooks';
import ErrorToast from "@/components/ui/notification/ErrorToast";

interface Props {
    isEditMode?: boolean;
}

const EventManagementPage: React.FC<Props> = ({ isEditMode = false }) => {
    const { eventId } = useParams<{ eventId: string }>();
    const {
        handleSubmit,
        handleCancel,
        handleConfirmCancel,
        handleConfirmDelete,
        notification,
        setNotification,
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
                    <ErrorToast
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default EventManagementPage;
