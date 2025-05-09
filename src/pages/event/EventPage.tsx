import React from 'react';
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

import SettingsIcon from '@/assets/img/settings.svg';

type EventPageMode = 'participant' | 'organizer';

interface EventPageProps {
    mode: EventPageMode;
}

const EventPage: React.FC<EventPageProps> = ({ mode }) => {
    const isOrganizer = mode === 'organizer';

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
                            <EventDescription text="Вальпургиева ночь — ночь в канун дня святой Вальпурги..." />
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
                                <Button label="Завершить" variant="red" size="small" />
                                <button className={styles.button}>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
