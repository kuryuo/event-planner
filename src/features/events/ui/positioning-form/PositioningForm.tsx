import React from 'react';
import styles from './PositioningForm.module.css';
import TagsInput from '../../../../shared/ui/tags-input/TagsInput';
import ParticipantsLimit from '../../../../shared/ui/participants-limit/ParticipantsLimit';

interface Props {
    categories: string[];
    roles: string[];
    categoryInput: string;
    roleInput: string;
    onCategoryInput: (val: string) => void;
    onRoleInput: (val: string) => void;
    onKeyDown: (
        e: React.KeyboardEvent<HTMLInputElement>,
        type: 'category' | 'role'
    ) => void;
    removeTag: (type: 'category' | 'role', tag: string) => void;
    maxEnabled: boolean;
    setMaxEnabled: (val: boolean) => void;
    maxParticipants: number;
    setMaxParticipants: (val: number) => void;
}

const PositioningForm: React.FC<Props> = ({
                                              categories,
                                              roles,
                                              categoryInput,
                                              roleInput,
                                              onCategoryInput,
                                              onRoleInput,
                                              onKeyDown,
                                              removeTag,
                                              maxEnabled,
                                              setMaxEnabled,
                                              maxParticipants,
                                              setMaxParticipants,
                                          }) => {
    return (
        <div className={styles.form}>
            <h3 className={styles.title}>Позиционирование</h3>

            <TagsInput
                label="Категории"
                tags={categories}
                inputValue={categoryInput}
                onInputChange={onCategoryInput}
                onKeyDown={(e) => onKeyDown(e, 'category')}
                onRemove={(tag) => removeTag('category', tag)}
                placeholder="Введите категорию и нажмите пробел"
            />

            <TagsInput
                label="Роли"
                tags={roles}
                inputValue={roleInput}
                onInputChange={onRoleInput}
                onKeyDown={(e) => onKeyDown(e, 'role')}
                onRemove={(tag) => removeTag('role', tag)}
                placeholder="Введите роль и нажмите пробел"
            />

            <ParticipantsLimit
                maxEnabled={maxEnabled}
                setMaxEnabled={setMaxEnabled}
                maxParticipants={maxParticipants}
                setMaxParticipants={setMaxParticipants}
            />
        </div>
    );
};

export default PositioningForm;
