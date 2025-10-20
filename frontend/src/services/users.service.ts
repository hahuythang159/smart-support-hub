import { ChangePasswordRequest, MessageResponse, User, Users } from "@/types";
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

export const changePasswordService = async (token: string, form: ChangePasswordRequest): Promise<MessageResponse> => {
    const response = await apiRequest('/users/change-password', {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
    })
    return response
}