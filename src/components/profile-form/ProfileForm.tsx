import React from 'react';
import styles from './ProfileForm.module.css';
import Input from '../input-field/InputField';

const ProfileForm: React.FC = () => {
    return (
        <form className={styles.profileForm}>
            <div className={styles.section}>
                <h3>Личные данные</h3>
                <div className={styles.inputRow}>
                    <div className={styles.inputColumn}>
                        <div className={styles.inputGroup}>
                            <Input label="Имя" type="text" placeholder="Роман" />
                        </div>
                        <div className={styles.inputGroup}>
                            <Input label="Фамилия" type="text" placeholder="Романов" />
                        </div>
                        <div className={styles.inputGroup}>
                            <Input label="Отчество" type="text" placeholder="Романович" />
                        </div>
                        <div className={styles.inputGroup}>
                            <Input label="Телефон" type="tel" placeholder="+7 (924) 678-56-23" />
                        </div>
                    </div>

                    <div className={styles.inputColumn}>
                        <div className={styles.inputGroup}>
                            <Input label="Телеграмм" type="text" placeholder="@user23456" />
                        </div>
                        <div className={styles.inputGroup}>
                            <Input label="Город" type="text" placeholder="Екатеринбург" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Данные об образовании</h3>
                <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                        <Input label="Учебное заведение" type="text" placeholder="УрФУ" />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.shortInput}`}>
                        <Input label="Курс" type="number" placeholder="3" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;
