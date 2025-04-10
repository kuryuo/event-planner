import React from 'react';
import styles from './EventInfoForm.module.css';
import Input from '../input-field/InputField';
import TextArea from '../text-area/TextAreaField';

const EventInfoForm: React.FC = () => {
    return (
        <form className={styles.form}>
            <div className={styles.section}>
                <h3 className={styles.title}>Информация о мероприятии</h3>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.group}>
                            <Input label="Название мероприятия" type="text" placeholder="Название события" />
                        </div>
                        <div className={styles.group}>
                            <Input label="Ответственный" type="text" placeholder="Имя ответственного" />
                        </div>
                        <div className={styles.group}>
                            <Input label="Место проведения" type="text" placeholder="Адрес или место" />
                        </div>
                        <div className={styles.group}>
                            <Input label="Тип мероприятия" type="text" placeholder="Онлайн/Офлайн/Гибридное" />
                        </div>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.group}>
                            <Input label="Дата начала" type="date" />
                        </div>
                        <div className={styles.group}>
                            <Input label="Дата окончания" type="date" />
                        </div>
                        <div className={styles.group}>
                            <Input label="Формат" type="text" placeholder="Онлайн/Офлайн" />
                        </div>
                    </div>
                </div>

                <div className={styles.group}>
                    <TextArea label="Описание мероприятия" placeholder="Опишите мероприятие" />
                </div>
            </div>
        </form>
    );
};

export default EventInfoForm;
