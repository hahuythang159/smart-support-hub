export interface TokenStorage {
    setToken: (token: string) => void;
    getToken: () => string | null;
    clearToken: () => void;
}