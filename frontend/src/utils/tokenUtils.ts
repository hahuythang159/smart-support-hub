import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/types';

/**
 * Function to retrieve the JWT token from storage (localStorage or sessionStorage)
 * @returns The JWT token if it exists, otherwise returns null
 */
export const getToken = () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token') || sessionStorage.getItem('token') || null

}

/**
 * Function to decode a JWT token
 * @param token The JWT token to decode
 * @returns Decoded token information if valid, otherwise returns null
 */
export const getDecodedToken = (token: string | null): DecodedToken | null => {
    if (token && typeof token === 'string' && token.split('.').length === 3) {
        try {
            return jwtDecode<DecodedToken>(token);
        } catch (error) {
            return null;
        }
    }
    return null;
};