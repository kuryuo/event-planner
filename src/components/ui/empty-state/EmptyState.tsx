import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
    message: string;
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, className = '' }) => {
    return <div className={`${styles.emptyState} ${className}`}>{message}</div>;
};

export default EmptyState;
