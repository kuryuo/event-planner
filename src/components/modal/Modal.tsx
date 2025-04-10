import React from 'react';
import styles from './Modal.module.css';
import close from '@/assets/img/close.svg'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    primaryText: string;
    secondaryText: string;
    primaryType?: 'default' | 'red' | 'border';
    secondaryType?: 'default' | 'red' | 'border';
};

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         title,
                                         description,
                                         primaryText,
                                         secondaryText,
                                         primaryType = 'default',
                                         secondaryType = 'border',
                                     }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <button className={styles.close} onClick={onClose} aria-label="Закрыть">
                        <img src={close} alt="Закрыть" className={styles.closeIcon} />
                    </button>
                </div>

                <p className={styles.description}>{description}</p>

                <div className={styles.footer}>
                    <button className={`${styles.button} ${styles[secondaryType]}`}>
                        {secondaryText}
                    </button>
                    <button className={`${styles.button} ${styles[primaryType]}`}>
                        {primaryText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
