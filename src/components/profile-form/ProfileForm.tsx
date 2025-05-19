import React from 'react';
import styles from './ProfileForm.module.css';
import Input from '@/components/input-field/InputField';
import { ProfileFormProps } from '@/services/profile/types';

const ProfileForm: React.FC<ProfileFormProps> = ({ formData, onChange }) => {
    return (
        <form className={styles.form}>
            <div className={styles.section}>
                <h3 className={styles.title}>Личные данные</h3>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.group}>
                            <Input
                                label="Фамилия"
                                value={formData.lastName}
                                onChange={(v) => onChange('lastName', v)}
                            />
                        </div>

                        <div className={styles.group}>
                            <Input
                                label="Имя"
                                value={formData.firstName}
                                onChange={(v) => onChange('firstName', v)}
                            />
                        </div>

                        <div className={styles.group}>
                            <Input
                                label="Отчество"
                                value={formData.middleName}
                                onChange={(v) => onChange('middleName', v)}
                            />
                        </div>

                        <div className={styles.group}>
                            <Input
                                label="Телефон"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(v) => onChange('phoneNumber', v)}
                            />
                        </div>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.group}>
                            <Input
                                label="Телеграмм"
                                value={formData.telegram}
                                onChange={(v) => onChange('telegram', v)}
                            />
                        </div>

                        <div className={styles.group}>
                            <Input
                                label="Город"
                                value={formData.city}
                                onChange={(v) => onChange('city', v)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;
