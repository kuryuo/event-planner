import React, {useState} from 'react';
import styles from './UserRoleFilter.module.css';
import InputField from '@/shared/ui/input-field/InputField';

const roles = [
    'Роль 1',
    'Роль 2',
    'Роль 3',
    'Роль 4',
    'Роль 5',
    'Роль 6',
];

const UserRoleFilter: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className={styles.root}>
            <p className={styles.title}>Роль в проекте</p>
            <InputField
                icon="search"
                placeholder="Поиск"
                value={searchValue}
                onChange={setSearchValue}
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
