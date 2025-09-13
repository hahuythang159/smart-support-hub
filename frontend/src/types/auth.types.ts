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

export type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
}

export type AuthLayoutProps = {
    title: string;
    children: React.ReactNode;
    footerText?: string;
    footerLinkText?: string;
    footerHref?: string;
}