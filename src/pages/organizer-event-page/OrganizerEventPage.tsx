import React from 'react';
import styles from './OrganizerEventPage.module.css';
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
import SettingsIcon from '@/assets/img/settings.svg';

const OrganizerEventPage: React.FC = () => {
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
                            <DescriptionBlock text="Вальпургиева ночь (от немецкого Walpurgisnacht) — ночь в канун дня поминания святой Вальпурги (1 мая). Этот день у древних германцев совпадает с языческим праздником «великий шабаш», который проходит на горе Брокен. Вальпургиева ночь (от немецкого Walpurgisnacht) — ночь в канун дня поминания святой Вальпурги (1 мая)." />
                        </div>

                        <div className={styles.galleryContainer}>
                            <PhotoGalleryPreview />
                        </div>

                        <NotificationsBlock />
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.buttonGroup}>
                            <Button label="Перейти в чат" variant="default" size="small" />
                            <Button label="Завершить" variant="red" size="small" />
                            <button className={styles.button}>
                                <img src={SettingsIcon} width={24} height={24} />
                            </button>
                        </div>

                        <EventDetails />

                        <SubscribersPreview />

                        <ContactsBlock />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizerEventPage;
