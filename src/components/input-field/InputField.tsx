import React from 'react';
import styles from './InputField.module.css';

const Input: React.FC<{
    label?: string;
    type: string;
    placeholder?: string;
}> = ({ label, type, placeholder }) => {
    return (
        <div className={styles.wrapper}>
            {label && <label htmlFor={label} className={styles.label}>{label}</label>}
            <input
                id={label}
                className={styles.input}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
