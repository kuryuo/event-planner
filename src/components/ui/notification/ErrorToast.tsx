import React, { useEffect, useState } from 'react';
import Notification from './Notification';

interface ErrorToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
    duration?: number;
}

const FADE_OUT_TIME = 300;

const ErrorToast: React.FC<ErrorToastProps> = ({
                                                   message,
                                                   type,
                                                   onClose,
                                                   duration = 5000,
                                               }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const hideTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, FADE_OUT_TIME);
        }, duration);
        return () => clearTimeout(hideTimer);
    }, [onClose, duration]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
                opacity: visible ? 1 : 0,
                transition: `opacity ${FADE_OUT_TIME}ms ease-in-out`,
            }}
        >
            <Notification message={message} type={type} onClose={onClose} />
        </div>
    );
};

export default ErrorToast;
