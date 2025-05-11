export interface ProfileResponse {
    id: string;
    lastName: string | null;
    firstName: string;
    middleName: string | null;
    phoneNumber: string | null;
    telegram: string | null;
    city: string | null;

}

export interface UpdateProfileRequest {
    lastName: string;
    firstName: string;
    middleName: string;
    phoneNumber: string;
    telegram: string;
    city: string;
}