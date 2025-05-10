import React from 'react';
import styles from './FormButtons.module.css';
import Button from '@/shared/ui/button/Button';

type FormActionsProps = {
    primaryText: string;
    secondaryText: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    reverse?: boolean;
    className?: string;
    buttonSize?: 'default' | 'small';
};

const FormButtons: React.FC<FormActionsProps> = ({
                                                     primaryText,
                                                     secondaryText,
                                                     onPrimaryClick,
                                                     onSecondaryClick,
                                                     reverse = false,
                                                     className,
                                                     buttonSize = 'default', // ← значение по умолчанию
                                                 }) => {
    const buttons = [
        <Button
            key="primary"
            variant="default"
            size={buttonSize}
            label={primaryText}
            onClick={onPrimaryClick}
        />,
        <Button
            key="secondary"
            variant="border"
            size={buttonSize}
            label={secondaryText}
            onClick={onSecondaryClick}
        />,
    ];

    return (
        <div className={`${styles.actions} ${className || ''}`}>
            {reverse ? buttons.reverse() : buttons}
        </div>
    );
};

export default FormButtons;
