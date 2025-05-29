import React from 'react';
import styles from './FormButtons.module.css';
import Button from '@/components/ui/button/Button';

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
                                                     buttonSize = 'default',
                                                 }) => {
    const buttons = [
        <Button
            key="primary"
            variant="grey"
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
