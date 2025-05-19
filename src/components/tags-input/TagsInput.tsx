import React from 'react';
import styles from './TagsInput.module.css';

interface TagsInputProps {
    label: string;
    tags: string[];
    inputValue: string;
    onInputChange: (val: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onRemove: (tag: string) => void;
    placeholder?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({
                                                 label,
                                                 tags,
                                                 inputValue,
                                                 onInputChange,
                                                 onKeyDown,
                                                 onRemove,
                                                 placeholder
                                             }) => {
    return (
        <div className={styles.block}>
            <label className={styles.label}>{label}</label>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
            />
            <div className={styles.tags}>
                {tags.map((tag) => (
                    <div className={styles.tag} key={tag}>
                        <span>{tag}</span>
                        <button onClick={() => onRemove(tag)} className={styles.remove}>×</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagsInput;
