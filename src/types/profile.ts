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
}

export interface UpdateProfileRequest extends BaseProfile {
    file?: File;
}
