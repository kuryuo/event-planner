import React from 'react';
import styles from './InputField.module.css';

const Input: React.FC<{
    label: string;
    type: string;
    placeholder?: string;
}> = ({ type, placeholder }) => {
    return (
        <div className={styles.inputWrapper}>
            <input
                className={styles.inputField}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
