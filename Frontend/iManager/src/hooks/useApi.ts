import axios from "axios";
import { User } from "../types/User";
import { Product } from "../types/Product";

const api = axios.create({
    baseURL: "http://localhost:8080/"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

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
        return await api.put('/user', updatedUser)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    },
    productsByUser: async(userID: number) => {
        return await api.get(`/product/products/${userID}`)
        .then((response) => response.data)
    },
    addProduct: async(newProduct: Product) => {
        return await api.post(`/product`, newProduct)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    },
    updateProduct: async(updatedProduct: Product) => {
        console.log(updatedProduct)
        return await api.put('/product', updatedProduct)
        .then((response) => response.data)
        
    },
    deleteProduct: async(productID: number) => {
        await api.delete(`/product/${productID}`)
        .catch((e) => {throw e.response.data})
    }
})