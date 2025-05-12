export interface EventInfoFormData {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
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
