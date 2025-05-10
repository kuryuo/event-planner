import React, { useState } from 'react';
import styles from './CreateEventPage.module.css';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import EventInfoForm from "@/features/create-event/ui/event-info-form/EventInfoForm";
import PositioningForm from '@/features/create-event/ui/positioning-form/PositioningForm';
import Avatar from '@/shared/ui/avatar/Avatar';
import FormButtons from "@/shared/ui/form-buttons/FormButtons";
import Modal from '@/shared/ui/modal/Modal';

interface NewEventPageProps {
    isEditMode?: boolean;
}

const NewEventPage: React.FC<NewEventPageProps> = ({ isEditMode = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(true);
    };

    const handleConfirmCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.page}>
            <Sidebar />
            <div className={styles.content}>
                <Header title="Создание мероприятия" />

                <div className={styles.formsContainer}>
                    <EventInfoForm />
                    <div className={styles.rightColumn}>
                        <PositioningForm />
                        <Avatar title="Изображение" />
                    </div>
                </div>

                <div className={styles.formActionsContainer}>
                    <FormButtons
                        primaryText={isEditMode ? "Сохранить изменения" : "Создать мероприятие"}
                        secondaryText="Отмена"
                        onSecondaryClick={handleCancel}
                    />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmCancel}
                    title="Подтверждение удаления"
                    description='Вы уверены, что хотите удалить мероприятие “Масленница 2025”?'
                    primaryText="Удалить"
                    secondaryText="Отмена"
                    primaryType="red"
                    secondaryType="border"
                    buttonSize="small"
                />
            </div>
        </div>
    );
};

export default NewEventPage;
