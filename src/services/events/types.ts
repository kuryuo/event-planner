export interface EventInfoFormData {
    name: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location: string;
    format: string;
    eventType: string;
    responsiblePersonId: string;
}

export interface PositioningFormData {
    categories: string[];
    roles: string[];
    maxParticipants: number | null;
}
