import { User, Users } from "@/types";
import { apiRequest } from "@/utils/api";

export const getAllUsers = async (token: string): Promise<Users> => {
    const response = await apiRequest('/users', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response
}

export const getMyProfileService = async (token: string): Promise<User> => {
    const response = await apiRequest('/users/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response
}
