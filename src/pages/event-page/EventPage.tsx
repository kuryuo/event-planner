import React from 'react';
import styles from './EventPage.module.css';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import EventTag from '@/components/event-tag/EventTag';
import DescriptionBlock from '@/components/description-block/DescriptionBlock';
import PhotoGalleryPreview from '@/components/photo-gallery-preview/PhotoGalleryPreview';
import NotificationsBlock from '@/components/notifications-block/NotificationsBlock';
import EventDetails from '@/components/event-details/EventDetails';
import SubscribersPreview from '@/components/subscribers-preview/SubscribersPreview';
import ContactsBlock from '@/components/contacts-block/ContactsBlock';
import Button from '@/components/button/Button';

const EventPage: React.FC = () => {
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

                        <DescriptionBlock text="Вальпургиева ночь (от немецкого Walpurgisnacht) — ночь в канун дня поминания святой Вальпурги (1 мая). Этот день у древних германцев совпадает с языческим праздником «великий шабаш», который проходит на горе Брокен. Вальпургиева ночь (от немецкого Walpurgisnacht) — ночь в канун дня поминания святой Вальпурги (1 мая). Вальпургиева ночь (от немецкого Walpurgisnacht) — ночь в канун дня поминания святой Вальпурги (1 мая)." />

                        <PhotoGalleryPreview />

                        <NotificationsBlock />
                    </div>

                    <div className={styles.rightColumn}>
                        <Button
                            label="Я пойду"
                            variant="default"
                            size="small"
                            className={styles.customButton}
                        />

                        <EventDetails />

                        <SubscribersPreview />

                        <ContactsBlock />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
