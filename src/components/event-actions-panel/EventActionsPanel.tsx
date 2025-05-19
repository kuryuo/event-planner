import React from 'react';
import Button from '@/components/button/Button';
import styles from './EventActionsPanel.module.css';
import SettingsIcon from '@/assets/img/settings.svg';

interface Props {
    isOrganizer: boolean;
    isSubscribed: boolean;
    onToggleSubscription: () => void;
    onFinish: () => void;
    onEdit: () => void;
}

const EventActionsPanel: React.FC<Props> = ({
                                                isOrganizer,
                                                isSubscribed,
                                                onToggleSubscription,
                                                onFinish,
                                                onEdit,
                                            }) => {
    if (isOrganizer) {
        return (
            <div className={styles.buttonGroup}>
                <Button label="Перейти в чат" variant="grey" size="small" />
                <Button label="Завершить" variant="red" size="small" onClick={onFinish} />
                <button className={styles.button} onClick={onEdit} aria-label="Настройки">
                    <img src={SettingsIcon} alt="Настройки" width={24} height={24} />
                </button>
            </div>
        );
    }

    return (
        <Button
            label={isSubscribed ? 'Я не пойду' : 'Я пойду'}
            variant={isSubscribed ? 'red' : 'grey'}
            size="small"
            className={styles.customButton}
            onClick={onToggleSubscription}
        />
    );
};

export default EventActionsPanel;
