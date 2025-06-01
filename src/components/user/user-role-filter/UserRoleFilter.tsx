import React from 'react';
import styles from './UserRoleFilter.module.css';
import InputField from '@/components/ui/input-field/InputField';

export interface UserRoleFilterProps {
    roles: string[];
    searchValue: string;
    onSearchChange: (v: string) => void;
}

const UserRoleFilter: React.FC<UserRoleFilterProps> = ({
                                                           roles,
                                                           searchValue,
                                                           onSearchChange,
                                                       }) => {
    return (
        <div className={styles.root}>
            <p className={styles.title}>Роль в проекте</p>
            <InputField
                icon="search"
                placeholder="Поиск"
                value={searchValue}
                onChange={onSearchChange}
                size="small"
            />

            <div className={styles.checkboxList}>
                {roles.map((role, index) => (
                    <label key={index} className={styles.checkboxRow}>
                        <input type="checkbox" />
                        <span className={styles.role}>{role}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default UserRoleFilter;