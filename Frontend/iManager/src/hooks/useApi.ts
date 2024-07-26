import axios from "axios";
import { User } from "../types/User";
import AddProduct from "../pages/AddProduct/AddProduct";
import { Product } from "../types/Product";

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
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    },
    productsByUser: async(userID: number) => {
        return await api.get(`/product/products/${userID}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
    },
    addProduct: async(newProduct: Product) => {
        await api.post(`/product`, newProduct, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    },
    updateProduct: async(updatedProduct: Product) => {
        console.log(updatedProduct)
        return await api.put('/product', updatedProduct, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        
    },
    deleteProduct: async(productID: number) => {
        await api.delete(`/product/${productID}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .catch((e) => {throw e.response.data})
    }
})