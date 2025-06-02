export interface Invite {
    id: string;
    inviteId: string;
    eventId: string;
    inviterUsername: string;
    communityName: string;
    avatar: string;
    isRead: boolean;
}

export interface SendInviteRequest {
    eventId: string;
    invitedId: string;
}

export interface RespondInviteRequest {
    inviteId: string;
    accept: boolean;
}
