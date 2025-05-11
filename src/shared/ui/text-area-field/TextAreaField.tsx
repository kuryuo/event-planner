import React from 'react';
import styles from './TextAreaField.module.css';

const TextAreaField: React.FC<{
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}> = ({ label, placeholder }) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label htmlFor={label} className={styles.inputLabel}>{label}</label>}
            <textarea
                id={label}
                className={styles.inputField}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextAreaField;
