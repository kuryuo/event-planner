import React from 'react';
import styles from './ProfileForm.module.css';
import Input from '../input-field/InputField';

const ProfileForm: React.FC = () => {
    return (
        <form className={styles.form}>
            <div className={styles.section}>
                <h3 className={styles.title}>Личные данные</h3>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.group}>
                            <Input label="Имя" type="text" placeholder="Роман" />
                        </div>
                        <div className={styles.group}>
                            <Input label="Фамилия" type="text" placeholder="Романов" />
                        </div>
                        <div className={styles.group}>
                            <Input label="Отчество" type="text" placeholder="Романович" />
                        </div>
                        <div className={styles.group}>
                            <Input label="Телефон" type="tel" placeholder="+7 (924) 678-56-23" />
                        </div>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.group}>
                            <Input label="Телеграмм" type="text" placeholder="@user23456" />
                        </div>
                        <div className={styles.group}>
                            <Input label="Город" type="text" placeholder="Екатеринбург" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;
