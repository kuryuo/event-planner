import React from 'react';
import styles from './ProfileForm.module.css';
import Input from '@/shared/ui/input-field/InputField';

interface Props {
    formData: {
        firstName: string;
        lastName: string;
        middleName: string;
        phoneNumber: string;
        telegram: string;
        city: string;
    };
    onChange: (field: string, value: string) => void;
    formErrors: Record<string, string>;
}

const ProfileForm: React.FC<Props> = ({ formData, onChange, formErrors }) => {
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
                            {formErrors.lastName && (
                                <span className={styles.error}>{formErrors.lastName}</span>
                            )}
                        </div>

                        <div className={styles.group}>
                            <Input
                                label="Имя"
                                value={formData.firstName}
                                onChange={(v) => onChange('firstName', v)}
                            />
                            {formErrors.firstName && (
                                <span className={styles.error}>{formErrors.firstName}</span>
                            )}
                        </div>

                        <div className={styles.group}>
                            <Input
                                label="Отчество"
                                value={formData.middleName}
                                onChange={(v) => onChange('middleName', v)}
                            />
                            {formErrors.middleName && (
                                <span className={styles.error}>{formErrors.middleName}</span>
                            )}
                        </div>

                        <div className={styles.group}>
                            <Input
                                label="Телефон"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(v) => onChange('phoneNumber', v)}
                            />
                            {formErrors.phoneNumber && (
                                <span className={styles.error}>{formErrors.phoneNumber}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.group}>
                            <Input
                                label="Телеграмм"
                                value={formData.telegram}
                                onChange={(v) => onChange('telegram', v)}
                            />
                            {formErrors.telegram && (
                                <span className={styles.error}>{formErrors.telegram}</span>
                            )}
                        </div>

                        <div className={styles.group}>
                            <Input
                                label="Город"
                                value={formData.city}
                                onChange={(v) => onChange('city', v)}
                            />
                            {formErrors.city && (
                                <span className={styles.error}>{formErrors.city}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;
