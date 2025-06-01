import React from 'react';
import styles from './UserRoleFilter.module.css';

export interface UserRoleFilterProps {
    roles: string[];
    selectedRoles: string[];
    onChange: (roles: string[]) => void;
}

const UserRoleFilter: React.FC<UserRoleFilterProps> = ({ roles, selectedRoles, onChange }) => {
    const toggleRole = (role: string) => {
        if (selectedRoles.includes(role)) {
            onChange(selectedRoles.filter((r) => r !== role));
        } else {
            onChange([...selectedRoles, role]);
        }
    };

    return (
        <div className={styles.root}>
            <p className={styles.title}>Роль в проекте</p>
            <div className={styles.checkboxList}>
                {roles.map((role, index) => (
                    <label key={index} className={styles.checkboxRow}>
                        <input
                            type="checkbox"
                            checked={selectedRoles.includes(role)}
                            onChange={() => toggleRole(role)}
                        />
                        <span className={styles.role}>{role}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default UserRoleFilter;