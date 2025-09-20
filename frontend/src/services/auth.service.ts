import { apiRequest } from "@/utils/api";
import { LoginForm, LoginResponse, RegisterForm } from "@/types";

/**
 * Sends a login request to the backend API.
 * @param form - The login form data containing email and password
 * @returns Promise resolving to the login response data (e.g., token)
 */
export const loginService = async (form: LoginForm): Promise<LoginResponse> => {
    const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form)
    })
    return data;
}
/**
 * Sends a registration request to the backend API.
 * @param form - The registration form data containing email and password
 * @returns Promise resolving when the registration completes successfully
 */
export const registerService = async (form: RegisterForm): Promise<void> => {
    await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form)
    })
}