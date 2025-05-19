import { Event } from '@/services/events/eventsSlice';
import { EventFilters } from '@/services/api/event/types';

export const useEventFilter = (events: Event[], filters: EventFilters): Event[] => {
    return events.filter(event => {
        const eventStart = new Date(event.startDate);

        if (filters.start) {
            const startFilter = new Date(filters.start);
            if (eventStart < startFilter) {
                return false;
            }
        }

        if (filters.end) {
            const endFilter = new Date(filters.end);
            if (eventStart > endFilter) {
                return false;
            }
        }

        if (filters.name) {
            const nameMatches = event.name.toLowerCase().includes(filters.name.toLowerCase());
            if (!nameMatches) {
                return false;
            }
        }

        if (filters.organizators?.length) {
            const included = filters.organizators.includes(event.responsiblePersonId);
            if (!included) {
                return false;
            }
        }

        if (filters.format) {
            if (event.format !== filters.format.toLowerCase()) {
                return false;
            }
        }

        if (filters.categories?.length) {
            const matchedCategory = event.categories.some(cat => filters.categories!.includes(cat));
            if (!matchedCategory) {
                return false;
            }
        }

        if (filters.hasFreePlaces) {

            if (event.maxParticipants === 0) {
                //нет ограничений
            } else {
                //пока нет логики непонятно ничего
            }
        }

        return true;
    });
};

