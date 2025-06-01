export interface BaseProfile {
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    telegram: string;
    city: string;
}

export interface ProfileResponse extends Partial<BaseProfile> {
    id: string;
    avatarUrl?: string;
    photoUrl?: string;
    eventRoleName?: string;
    name: string;
    email?: string;
    role?: string;
}

export interface UpdateProfileRequest extends BaseProfile {
    file?: File;
}
