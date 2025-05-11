import React from 'react';
import styles from './NewEventPage.module.css';

import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import EventInfoFormContainer from '@/features/create-event/ui/event-info-form/EventInfoFormContainer';
import PositioningFormContainer from '@/features/create-event/ui/positioning-form/PositioningFormContainer';
import Avatar from '@/shared/ui/avatar/Avatar';
import FormButtons from '@/shared/ui/form-buttons/FormButtons';
import Modal from '@/shared/ui/modal/Modal';
import Notification from '@/shared/ui/notification/Notification';

import { useCreateEventForm } from '@/features/create-event/model/useNewEventForm';

const NewEventPage: React.FC = () => {
    const {
        // eventInfo,
        // positioning,
        setEventInfo,
        setPositioning,
        notification,
        setNotification,
        isModalOpen,
        setIsModalOpen,
        handleSubmit,
    } = useCreateEventForm();

    const handleCancel = () => setIsModalOpen(true);
    const handleConfirmCancel = () => setIsModalOpen(false);

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Создание мероприятия" />

                <div className={styles.formsContainer}>
                    <EventInfoFormContainer onChange={setEventInfo} />
                    <div className={styles.rightColumn}>
                        <PositioningFormContainer onChange={setPositioning} />
                        <Avatar title="Изображение" />
                    </div>
                </div>

                <div className={styles.formActionsContainer}>
                    <FormButtons
                        primaryText="Создать мероприятие"
                        secondaryText="Отмена"
                        onPrimaryClick={handleSubmit}
                        onSecondaryClick={handleCancel}
                    />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmCancel}
                    title="Подтверждение отмены"
                    description="Вы уверены, что хотите отменить создание мероприятия?"
                    primaryText="Да, отменить"
                    secondaryText="Продолжить редактирование"
                    primaryType="red"
                    secondaryType="border"
                    buttonSize="small"
                />

                {notification && (
                    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
                        <Notification
                            type={notification.type}
                            message={notification.message}
                            onClose={() => setNotification(null)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewEventPage;
