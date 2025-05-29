import React from 'react';
import Notification from './Notification';

interface ErrorToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, type, onClose }) => (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <Notification message={message} type={type} onClose={onClose} />
    </div>
);

export default ErrorToast;
