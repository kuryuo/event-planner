import React from 'react';
import styles from './NewEventPage.module.css';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import EventInfoForm from "@/components/event-info-form/EventInfoForm";
import PositioningForm from '@/components/positioning-form/PositioningForm';
import ProfilePhoto from '@/components/profile-photo/ProfilePhoto';
import FormButtons from "@/components/form-buttons/FormButtons";

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
                        <ProfilePhoto title="Изображение" />
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
