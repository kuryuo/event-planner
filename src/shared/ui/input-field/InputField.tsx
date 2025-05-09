import React from 'react';
import styles from './InputField.module.css';
import searchIcon from '@/assets/img/search.svg';

interface InputFieldProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    icon?: 'search' | null;
    size?: 'small' | 'medium';
}

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   type = 'text',
                                                   placeholder,
                                                   value,
                                                   onChange,
                                                   icon = null,
                                                   size = 'medium',
                                               }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={`${styles.wrapper} ${styles[size]}`}>
            {label && <label className={styles.label}>{label}</label>}

            <div className={styles.inputContainer}>
                {icon === 'search' && <img src={searchIcon} alt="search" className={styles.icon} />}
                <input
                    type={type}
                    placeholder={placeholder}
                    className={styles.input}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default InputField;
