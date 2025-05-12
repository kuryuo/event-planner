import React, { useState } from 'react';
import styles from './EventFilterModal.module.css';
import FormButtons from "@/shared/ui/form-buttons/FormButtons";

type Props = {
    onClose: () => void;
};

const EventFilterModal: React.FC<Props> = ({ onClose }) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [format, setFormat] = useState('');
    const [availableOnly, setAvailableOnly] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);

    const allCategories = ['Учебное', 'Научное', 'Развлекательное', 'Культурное'];
    const formats = ['Онлайн', 'Офлайн', 'Гибрид'];

    const toggleCategory = (category: string) => {
        setCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleApply = () => {
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Фильтры мероприятий</h2>

                <div className={styles.section}>
                    <label className={styles.title2}>Дата мероприятия</label>
                    <div className={styles.dateRange}>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={e => setDateFrom(e.target.value)}
                            className={styles.dateInput}
                        />
                        <span className={styles.dash}>–</span>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={e => setDateTo(e.target.value)}
                            className={styles.dateInput}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <label className={styles.title2}>Организатор:</label>
                    <input
                        type="text"
                        placeholder="Имя организатора"
                        value={organizer}
                        onChange={e => setOrganizer(e.target.value)}
                    />
                </div>

                <div className={styles.section}>
                    <label className={styles.title2}>Формат:</label>
                    <div className={styles.selectRow}>
                        {formats.map(f => (
                            <button
                                key={f}
                                className={`${styles.option} ${format === f ? styles.selected : ''}`}
                                onClick={() => setFormat(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <label className={styles.title2}>
                        <input
                            type="checkbox"
                            checked={availableOnly}
                            onChange={() => setAvailableOnly(prev => !prev)}
                        />
                        &nbsp;Только с доступными местами
                    </label>
                </div>

                <div className={styles.section}>
                    <label className={styles.title2}>Категории:</label>
                    <div className={styles.selectRow}>
                        {allCategories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.option} ${categories.includes(cat) ? styles.selected : ''}`}
                                onClick={() => toggleCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <FormButtons
                    primaryText="Применить"
                    secondaryText="Отмена"
                    onPrimaryClick={handleApply}
                    onSecondaryClick={onClose}
                    buttonSize="small"
                />

            </div>
        </div>
    );
};

export default EventFilterModal;
