import React from 'react';
import styles from './ParticipantsLimit.module.css';

interface ParticipantsLimitProps {
    maxEnabled: boolean;
    setMaxEnabled: (val: boolean) => void;
    maxParticipants: number;
    setMaxParticipants: (val: number) => void;
}

const ParticipantsLimit: React.FC<ParticipantsLimitProps> = ({
                                                                 maxEnabled,
                                                                 setMaxEnabled,
                                                                 maxParticipants,
                                                                 setMaxParticipants,
                                                             }) => {
    return (
        <div className={styles.limitRow}>
            <label className={styles.checkboxWrap}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={maxEnabled}
                    onChange={(e) => setMaxEnabled(e.target.checked)}
                />
                Установить макс. количество участников
            </label>

            {maxEnabled && (
                <div className={styles.counter}>
                    <label htmlFor="participantsLimit" className={styles.label}>
                        Ограничение
                    </label>
                    <input
                        type="number"
                        id="participantsLimit"
                        className={styles.counterInput}
                        value={maxParticipants}
                        min={0}
                        onChange={(e) => setMaxParticipants(Number(e.target.value))}
                    />
                </div>
            )}
        </div>
    );
};

export default ParticipantsLimit;
