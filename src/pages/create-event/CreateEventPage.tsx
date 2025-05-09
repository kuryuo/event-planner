import React from 'react';
import styles from './CreateEventPage.module.css';
import Sidebar from '@/widgets/sidebar/Sidebar';
import Header from '@/widgets/header/Header';
import EventInfoForm from "@/features/create-event/ui/event-info-form/EventInfoForm";
import PositioningForm from '@/features/create-event/ui/positioning-form/PositioningForm';
import Avatar from '@/shared/ui/avatar/Avatar';
import FormButtons from "@/shared/ui/form-buttons/FormButtons";

const NewEventPage: React.FC = () => {
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
                        primaryText="Создать мероприятие"
                        secondaryText="Отмена"
                    />
                </div>
            </div>
        </div>
    );
};

export default NewEventPage;
