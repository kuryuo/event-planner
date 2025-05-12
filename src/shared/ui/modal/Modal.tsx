import React from 'react';
import styles from './Modal.module.css';
import Close from '@/assets/img/close.svg?react';
import Button from '@/shared/ui/button/Button';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    primaryText: string;
    secondaryText: string;
    primaryType?: 'grey' | 'red' | 'border';
    secondaryType?: 'grey' | 'red' | 'border';
    buttonSize?: 'default' | 'small';
};

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         onConfirm,
                                         title,
                                         description,
                                         primaryText,
                                         secondaryText,
                                         primaryType = 'grey',
                                         secondaryType = 'border',
                                         buttonSize = 'default',
                                     }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <button className={styles.close} onClick={onClose} aria-label="Закрыть">
                        <Close className={styles.closeIcon} />
                    </button>
                </div>

                <p className={styles.description}>{description}</p>

                <div className={styles.footer}>
                    <Button
                        label={secondaryText}
                        onClick={onClose}
                        variant={secondaryType}
                        size={buttonSize}
                    />
                    <Button
                        label={primaryText}
                        onClick={() => {
                            onConfirm?.();
                        }}
                        variant={primaryType}
                        size={buttonSize}
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;
