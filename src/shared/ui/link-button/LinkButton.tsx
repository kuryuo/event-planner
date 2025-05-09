import React from 'react';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
    label: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, onClick, type = 'button' }) => {
    return (
        <button className={styles.link} onClick={onClick} type={type}>
            {label}
        </button>
    );
};

export default LinkButton;
