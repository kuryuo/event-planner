export interface EventPost {
    id: string;
    eventId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    authorName: string;
}

export interface CreateOrUpdateEventPostRequest {
    eventId: string;
    text: string;
}