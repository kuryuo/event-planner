import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EventsToolbar.module.css';
import CalendarIcon from '@/assets/img/calendar2.svg?react';
import ListIcon from '@/assets/img/list.svg?react';
import FilterIcon from '@/assets/img/filter.svg?react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { AppRoute } from "@/utils/const";
import EventFilterModal from "@/components/event/event-filter-modal/EventFilterModal";
import { EventFilters } from '@/types';

type ToolbarProps = {
    label: string;
    onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => void;
    date: Date;
    onApplyFilters: (filters: EventFilters) => void;
};

const EventsToolbar: React.FC<ToolbarProps> = ({ onNavigate, date, onApplyFilters }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isCalendar = location.pathname === AppRoute.CALENDAR;
    const isEventList = location.pathname === AppRoute.EVENT_LIST;

    const [showFilters, setShowFilters] = useState(false);

    const month = format(date, 'LLLL', { locale: ru });
    const year = format(date, 'yyyy', { locale: ru });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <button className={styles.arrow} onClick={() => onNavigate('PREV')}>&lt;</button>
                <span className={styles.month}>
                    {capitalizedMonth} <span className={styles.year}>{year}</span>
                </span>
                <button className={styles.arrow} onClick={() => onNavigate('NEXT')}>&gt;</button>
            </div>

            <div className={styles.right}>
                <button className={styles.iconButton} onClick={() => setShowFilters(true)}>
                    <FilterIcon className={styles.filter} />
                </button>

                {showFilters && (
                    <EventFilterModal
                        onClose={() => setShowFilters(false)}
                        onApply={(filters) => {
                            onApplyFilters(filters);
                            setShowFilters(false);
                        }}
                    />
                )}

                <button className={styles.iconButton} onClick={() => navigate(AppRoute.CALENDAR)}>
                    <CalendarIcon className={`${styles.calendar} ${isCalendar ? styles.active : ''}`} />
                </button>
                <button className={styles.iconButton} onClick={() => navigate(AppRoute.EVENT_LIST)}>
                    <ListIcon className={`${styles.list} ${isEventList ? styles.active : ''}`} />
                </button>
            </div>
        </div>
    );
};

export default EventsToolbar;
