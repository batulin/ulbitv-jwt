export interface User {
    email: string;
    id: number;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}