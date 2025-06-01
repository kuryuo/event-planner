import { useState, useMemo } from 'react';
import { useGetEventRolesQuery } from '@/services/api/event/eventApi';

/**
 * Хук для управления ролями в ивенте: загрузка, поиск, фильтрация и т.д.
 */
export const useEventRoles = (eventId?: string) => {
    const { data: roles = [], isLoading, isError } = useGetEventRolesQuery(eventId!, {
        skip: !eventId,
    });

    const [searchValue, setSearchValue] = useState('');

    const filteredRoles = useMemo(() => {
        return roles.filter((role) =>
            role.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [roles, searchValue]);

    return {
        roles,
        filteredRoles,
        searchValue,
        setSearchValue,
        isLoading,
        isError,
    };
};
