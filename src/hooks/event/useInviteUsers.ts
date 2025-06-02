import { useState } from 'react';
import { useGetEventUsersQuery } from '@/services/api/event/eventApi';

export function useInviteUsers() {
    const [searchValue, setSearchValue] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const { data: users = [], isLoading } = useGetEventUsersQuery(searchValue, {
        skip: searchValue.trim() === '',
    });

    const toggleUser = (userId: string) => {
        setSelectedIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    return {
        searchValue,
        setSearchValue,
        selectedIds,
        toggleUser,
        users,
        isLoading,
        isEmptySearch: searchValue.trim() === '',
    };
}
