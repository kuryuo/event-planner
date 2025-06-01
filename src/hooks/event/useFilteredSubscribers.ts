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
        return subscribers.filter((user) => {
            const matchesName = !nameSearch || user.name?.toLowerCase().includes(nameSearch.toLowerCase()) ||
                user.email?.toLowerCase().includes(nameSearch.toLowerCase());

            const matchesRole =
                selectedRoles.length === 0 ||
                (user.eventRoleName !== undefined && selectedRoles.includes(user.eventRoleName));

            return matchesName && matchesRole;
        });
    }, [subscribers, nameSearch, selectedRoles]);
};
