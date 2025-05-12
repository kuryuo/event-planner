import React from 'react';
import styles from './EventInfoForm.module.css';
import Input from '@/shared/ui/input-field/InputField';
import TextArea from '@/shared/ui/text-area-field/TextAreaField';

interface Props {
    formData: {
        name: string;
        description: string;
        startDate: string;
        startTime: string;
        endDate: string;
        endTime: string;
        location: string;
        format: string;
        eventType: string;
        responsiblePersonId: string;
    };
    onChange: (data: Props['formData']) => void;
}

const EventInfoForm: React.FC<Props> = ({ formData, onChange }) => {
    const handleChange = (key: keyof Props['formData'], value: string) => {
        onChange({
            ...formData,
            [key]: value,
        });
    };

    return (
        <form className={styles.form}>
            <div className={styles.section}>
                <h3 className={styles.title}>Информация о мероприятии</h3>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.group}>
                            <Input
                                label="Название мероприятия"
                                type="text"
                                placeholder="Название события"
                                value={formData.name}
                                onChange={(v) => handleChange('name', v)}
                            />
                        </div>
                        <div className={styles.group}>
                            <Input
                                label="Место проведения"
                                type="text"
                                placeholder="Адрес или место"
                                value={formData.location}
                                onChange={(v) => handleChange('location', v)}
                            />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Тип мероприятия</label>
                            <select
                                className={styles.select}
                                value={formData.eventType}
                                onChange={(e) => handleChange('eventType', e.target.value)}
                            >
                                <option value="open">Открытое</option>
                                <option value="closed">Закрытое</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Формат</label>
                            <select
                                className={styles.select}
                                value={formData.format}
                                onChange={(e) => handleChange('format', e.target.value)}
                            >
                                <option value="online">Онлайн</option>
                                <option value="offline">Офлайн</option>
                                <option value="hybrid">Гибрид</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.group}>
                            <Input
                                label="Дата начала"
                                type="date"
                                value={formData.startDate}
                                onChange={(v) => handleChange('startDate', v)}
                            />
                        </div>
                        <div className={styles.group}>
                            <Input
                                label="Дата окончания"
                                type="date"
                                value={formData.endDate}
                                onChange={(v) => handleChange('endDate', v)}
                            />
                        </div>
                        <div className={styles.group}>
                            <Input
                                label="Время начала"
                                type="time"
                                value={formData.startTime}
                                onChange={(v) => handleChange('startTime', v)}
                            />
                        </div>
                        <div className={styles.group}>
                            <Input
                                label="Время окончания"
                                type="time"
                                value={formData.endTime}
                                onChange={(v) => handleChange('endTime', v)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.group}>
                    <TextArea
                        label="Описание мероприятия"
                        placeholder="Опишите мероприятие"
                        value={formData.description}
                        onChange={(v) => handleChange('description', v)}
                    />
                </div>
            </div>
        </form>
    );
};

export default EventInfoForm;
