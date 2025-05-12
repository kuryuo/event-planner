import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant: 'grey' | 'border' | 'red';
    size?: 'default' | 'small';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant, size = 'default', className }) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className ? className : ''}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
