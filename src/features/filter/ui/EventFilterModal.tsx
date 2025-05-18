import React, { useState, useEffect } from 'react';
import styles from './EventFilterModal.module.css';
import FormButtons from "@/shared/ui/form-buttons/FormButtons";
import Button from "@/shared/ui/button/Button";
import { EventFilters } from '@/shared/api/event/types';
import { useGetCategoriesQuery } from '@/shared/api/category/categoryApi';

type Props = {
    onClose: () => void;
    onApply: (filters: EventFilters) => void;
};

const FILTER_STORAGE_KEY = 'event_filters';

const EventFilterModal: React.FC<Props> = ({ onClose, onApply }) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [format, setFormat] = useState('');
    const [availableOnly, setAvailableOnly] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);

    const { data: allCategories = [], isLoading } = useGetCategoriesQuery();

    useEffect(() => {
        const savedFilters: EventFilters = JSON.parse(localStorage.getItem(FILTER_STORAGE_KEY) || '{}');

        setDateFrom(savedFilters.start || '');
        setDateTo(savedFilters.end || '');
        setFormat(savedFilters.format || '');
        setAvailableOnly(!!savedFilters.hasFreePlaces);
        setCategories(savedFilters.categories || []);
    }, []);

    const formats = [
        { label: 'Онлайн', value: 'online' },
        { label: 'Офлайн', value: 'offline' },
        { label: 'Гибрид', value: 'hybrid' }
    ];

    const toggleCategory = (category: string) => {
        setCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleApply = () => {
        const filters: EventFilters = {
            start: dateFrom || undefined,
            end: dateTo || undefined,
            format: format || undefined,
            hasFreePlaces: availableOnly || undefined,
            categories: categories.length > 0 ? categories : undefined,
        };

        localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));

        onApply(filters);
        onClose();
    };

    const handleReset = () => {
        setDateFrom('');
        setDateTo('');
        setFormat('');
        setAvailableOnly(false);
        setCategories([]);
        localStorage.removeItem(FILTER_STORAGE_KEY);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Фильтры мероприятий</h2>

                <div className={styles.section}>
                    <label className={styles.title2}>Дата мероприятия</label>
                    <div className={styles.dateRange}>
                        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className={styles.dateInput} />
                        <span className={styles.dash}>–</span>
                        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className={styles.dateInput} />
                    </div>
                </div>

                <div className={styles.section}>
                    <label className={styles.title2}>Формат:</label>
                    <div className={styles.selectRow}>
                        {formats.map(f => (
                            <button
                                key={f.value}
                                className={`${styles.option} ${format === f.value ? styles.selected : ''}`}
                                onClick={() => setFormat(f.value)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <label className={styles.title2}>
                        <input type="checkbox" checked={availableOnly} onChange={() => setAvailableOnly(prev => !prev)} />
                        &nbsp;Только с доступными местами
                    </label>
                </div>

                <div className={styles.section}>
                    <label className={styles.title2}>Категории:</label>
                    {isLoading ? (
                        <div className={styles.loading}>Загрузка категорий...</div>
                    ) : (
                        <div className={styles.selectRow}>
                            {allCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`${styles.option} ${categories.includes(cat.name) ? styles.selected : ''}`}
                                    onClick={() => toggleCategory(cat.name)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.footerActions}>
                    <FormButtons
                        primaryText="Применить"
                        secondaryText="Отмена"
                        onPrimaryClick={handleApply}
                        onSecondaryClick={onClose}
                        buttonSize="small"
                    />
                    <Button
                        label="Сбросить фильтры"
                        variant="red"
                        size="small"
                        onClick={handleReset}
                        className={styles.resetButton}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventFilterModal;
