export interface EventFilters {
    start?: string;
    end?: string;
    name?: string;
    organizators?: string[];
    format?: string;
    hasFreePlaces?: boolean;
    categories?: string[];
    offset?: number;
    count?: number;
}

export interface CreateEventRequest {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    format: string;
    eventType: string;
    responsiblePersonId: string;
    maxParticipants: number;
    categories: string[]
    roles: string[];
}
