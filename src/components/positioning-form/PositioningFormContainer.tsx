import React, { useEffect, useState } from 'react';
import PositioningForm from './PositioningForm';
import { PositioningFormData } from "@/services/events/types";

interface Props {
    onChange?: (data: PositioningFormData) => void;
    initialValues?: PositioningFormData;
}

const PositioningFormContainer: React.FC<Props> = ({ onChange, initialValues }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const [maxEnabled, setMaxEnabled] = useState(false);
    const [maxParticipants, setMaxParticipants] = useState(250);

    const [categoryInput, setCategoryInput] = useState('');
    const [roleInput, setRoleInput] = useState('');

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        type: 'category' | 'role'
    ) => {
        if ((e.key === ' ' || e.key === 'Enter') && e.currentTarget.value.trim()) {
            e.preventDefault();
            const value = e.currentTarget.value.trim();

            if (type === 'category' && !categories.includes(value)) {
                setCategories([...categories, value]);
                setCategoryInput('');
            }

            if (type === 'role' && !roles.includes(value)) {
                setRoles([...roles, value]);
                setRoleInput('');
            }
        }
    };

    const removeTag = (type: 'category' | 'role', tag: string) => {
        if (type === 'category') setCategories(categories.filter(c => c !== tag));
        if (type === 'role') setRoles(roles.filter(r => r !== tag));
    };

    useEffect(() => {
        if (initialValues) {
            setCategories(initialValues.categories || []);
            setRoles(initialValues.roles || []);
            setMaxEnabled(!!initialValues.maxParticipants);
            setMaxParticipants(initialValues.maxParticipants || 250);
        }
    }, [initialValues]);

    useEffect(() => {
        if (onChange) {
            onChange({
                categories,
                roles,
                maxParticipants: maxEnabled ? maxParticipants : null,
            });
        }
    }, [categories, roles, maxEnabled, maxParticipants, onChange]);

    return (
        <PositioningForm
            categories={categories}
            roles={roles}
            categoryInput={categoryInput}
            roleInput={roleInput}
            onCategoryInput={setCategoryInput}
            onRoleInput={setRoleInput}
            onKeyDown={handleKeyDown}
            removeTag={removeTag}
            maxEnabled={maxEnabled}
            setMaxEnabled={setMaxEnabled}
            maxParticipants={maxParticipants}
            setMaxParticipants={setMaxParticipants}
        />
    );
};

export default PositioningFormContainer;
