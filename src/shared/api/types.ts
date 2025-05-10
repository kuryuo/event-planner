export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
    };
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ProfileResponse {
    id: string;
    lastName: string | null;
    firstName: string;
    middleName: string | null;
    phoneNumber: string | null;
    telegram: string | null;
    city: string | null;
    educationalInstitution: string | null;
    courseNumber: number | null;
}

export interface UpdateProfileRequest {
    lastName: string;
    firstName: string;
    middleName: string;
    phoneNumber: string;
    telegram: string;
    city: string;
    educationalInstitution: string;
    courseNumber: number;
}
