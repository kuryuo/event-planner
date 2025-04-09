import React from 'react';
import styles from './InputField.module.css';

const Input: React.FC<{
    label?: string;
    type: string;
    placeholder?: string;
}> = ({ label, type, placeholder }) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label htmlFor={label} className={styles.inputLabel}>{label}</label>}
            <input
                id={label}
                className={styles.inputField}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
