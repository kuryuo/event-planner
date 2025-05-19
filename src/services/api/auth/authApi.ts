import { baseApi } from '../baseApi';
import {
    AuthResponse,
    RegisterRequest,
    LoginRequest,
    ForgotPasswordRequest,
} from './types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
        }),

        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
        }),

        forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
            query: (body) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
} = authApi;
