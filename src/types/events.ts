export interface BaseEvent {
    name: string;
    description: string;
    startDate: string;
    startTime: string
    endDate: string;
    endTime: string
    location: string;
    format: string;
    eventType: string;
    responsiblePersonId: string;
    maxParticipants: number;
    roles: string[];
    categories: string[];
}

export interface Event extends BaseEvent {
    id: string;
}

export type CreateEventRequest = BaseEvent;
