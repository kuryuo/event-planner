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
