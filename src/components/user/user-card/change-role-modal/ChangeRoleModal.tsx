import React, { useState } from 'react';
import Modal from '@/components/ui/modal/Modal';
import FormButtons from '@/components/ui/form-buttons/FormButtons';
import styles from './ChangeRoleModal.module.css';
import { useEventRoles } from '@/hooks/roles/useEventRoles';

interface ChangeRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selectedRole: string) => void;
    eventId: string;
    currentRole?: string;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             onConfirm,
                                                             eventId,
                                                             currentRole,
                                                         }) => {
    const { roles, isLoading } = useEventRoles(eventId);
    const [selectedRole, setSelectedRole] = useState<string | null>(currentRole || null);

    const handleConfirm = () => {
        if (selectedRole) onConfirm(selectedRole);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Изменить роль">
            <div className={styles.roleList}>
                {isLoading && <p>Загрузка ролей...</p>}

                {!isLoading &&
                    roles.map((r, i) => (
                        <label key={i} className={styles.roleOption}>
                            <input
                                type="radio"
                                name="user-role"
                                value={r}
                                checked={selectedRole === r}
                                onChange={() => setSelectedRole(r)}
                            />
                            <span>{r}</span>
                        </label>
                    ))}
            </div>

            <FormButtons
                primaryText="Подтвердить"
                secondaryText="Отмена"
                onPrimaryClick={handleConfirm}
                onSecondaryClick={onClose}
                buttonSize="small"
            />
        </Modal>
    );
};

export default ChangeRoleModal;
