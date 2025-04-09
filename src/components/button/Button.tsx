import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant: 'default' | 'border' | 'red';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant }) => {
    const buttonClass = `${styles.button} ${styles[variant]}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
