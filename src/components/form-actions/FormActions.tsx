import React from 'react';
import styles from './FormActions.module.css';
import Button from '@/components/button/Button';

type FormActionsProps = {
    primaryText?: string;
    secondaryText?: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    reverse?: boolean;
    className?: string;
};

const FormActions: React.FC<FormActionsProps> = ({
                                                     primaryText = 'Сохранить изменения',
                                                     secondaryText = 'Отмена',
                                                     onPrimaryClick,
                                                     onSecondaryClick,
                                                     reverse = false,
                                                     className,
                                                 }) => {
    const buttons = [
        <Button
            key="primary"
            variant="default"
            label={primaryText}
            onClick={onPrimaryClick}
        />,
        <Button
            key="secondary"
            variant="border"
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

export default FormActions;
