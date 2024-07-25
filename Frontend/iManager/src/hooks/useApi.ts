import axios from "axios";
import { User } from "../types/User";

const api = axios.create({
    baseURL: "http://localhost:8080/"
})

const authToken = localStorage.getItem("authToken");

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('auth/validate', { token });
        return response.data;
    },
    signin: async (email: string, password: string) => {
        var user = {email: email, password: password}
        return await api.post(`auth/login`, user)
            .then((response) => response.data)
            .catch((e) => {throw e.response.data});
    },
    register: async(newUser: User) => {
        return await api.post(`auth/register`, newUser)
            .then((response) => response.data)
            .catch((e) => {throw e.response.data});
    },
    updateUser: async(updatedUser: User) => {
        return await api.put('/user', updatedUser, {
            headers: {
                Authorization: `Beare ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    }
})