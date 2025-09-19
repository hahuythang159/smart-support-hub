export type LoginForm = {
    email: string;
    password: string;
}

export type RegisterForm = {
    email: string,
    password: string;
}

export type LoginResponse = {
    token: string;
}

export type UserRole = 'user' | 'staff' | 'admin' | null;

export type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    userId: string | null;
    role: UserRole;
    loading: boolean;
    error: string | null;
}

export type DecodedToken = {
    id: string;
    role: UserRole;
    exp: number;
}

export type AuthLayoutProps = {
    title: string;
    children: React.ReactNode;
    footerText?: string;
    footerLinkText?: string;
    footerHref?: string;
}