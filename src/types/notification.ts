export interface Notification {
    id: string;
    userId: string;
    type: 'Invite' | string;
    payload: string;
    isRead: boolean;
    createdAt: string;
}