export interface Invite {
    id: string;
    eventId: string;
    invitedId: string;
    invitedName: string;
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
    createdAt: string;
}

export interface SendInviteRequest {
    eventId: string;
    invitedId: string;
}

export interface RespondInviteRequest {
    inviteId: string;
    accept: boolean;
}
