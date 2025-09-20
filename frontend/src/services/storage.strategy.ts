import { TokenStorage } from "@/interfaces";

export const localStorageStrategy: TokenStorage = {
    setToken: (token) => {
        localStorage.setItem("token", token)
    },
    getToken: () => {
        return localStorage.getItem("token")
    },
    clearToken: () => {
        localStorage.removeItem("token")
    }
}

export const sessionStorageStrategy: TokenStorage = {
    setToken: (token) => {
        sessionStorage.setItem("token", token)
    },
    getToken: () => {
        return sessionStorage.getItem("token")
    },
    clearToken: () => {
        sessionStorage.removeItem("token")
    }
}