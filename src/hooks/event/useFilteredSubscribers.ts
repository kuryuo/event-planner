import { useMemo } from 'react';
import { ProfileResponse } from '@/types';

interface UseFilteredSubscribersParams {
    subscribers: ProfileResponse[];
    nameSearch: string;
    selectedRoles: string[];
}

export const useFilteredSubscribers = ({
                                           subscribers,
                                           nameSearch,
                                           selectedRoles,
                                       }: UseFilteredSubscribersParams): ProfileResponse[] => {
    return useMemo(() => {
        const filtered = subscribers
            .filter((user) => user.role !== 'Организатор')
            .filter((user) => {
                const matchesName =
                    !nameSearch ||
                    user.name?.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    user.email?.toLowerCase().includes(nameSearch.toLowerCase());

                const matchesRole =
                    selectedRoles.length === 0 ||
                    (user.role !== undefined && selectedRoles.includes(user.role));

                return matchesName && matchesRole;
            });

        const uniqueById = filtered.filter(
            (user, index, self) =>
                index === self.findIndex((u) => u.id === user.id)
        );

        return uniqueById;
    }, [subscribers, nameSearch, selectedRoles]);
};
