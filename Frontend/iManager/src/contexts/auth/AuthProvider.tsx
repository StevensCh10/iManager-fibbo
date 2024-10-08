import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { Product } from "../../types/Product";

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const [user, setUser] = useState<User |  null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                const data = await api.validateToken(storageData);
                if (data.user) {
                    setUser(data.user);
                }
            }
        }
        validateToken();
    }, [api]);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if(data.user && data.token){
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
            return true;
        }
        return false;
    }

    const register = async(newUser: User) => {
        const data = await api.register(newUser);
        if(data.user && data.token){
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
        }
        return data.user;
    }

    const signout = () => {
        localStorage.clear();
        setUser(null);
    }

    const updateUser = async(updatedUser: User) => {
        const data = await api.updateUser(updatedUser);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
    }

    const updatePassword = async(updatedUser: User, oldPassword: String, newPassword: String) => {
        const data = await api.updatePassword(updatedUser, oldPassword, newPassword);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    }

    const productsByUser = async(userID: number) => {
        const data = await api.productsByUser(userID);
        localStorage.setItem('products', JSON.stringify(data));
        return data;
    }

    const addProduct = async(newProduct: Product) => {
        const data = await api.addProduct(newProduct);
        const products = JSON.parse(localStorage.getItem('products')!);
        products.push(data);
        localStorage.setItem('products', JSON.stringify(products));
        return data;
    }

    const updateProduct = async(updatedProduct: Product) => {
        await api.updateProduct(updatedProduct);
        await productsByUser(updatedProduct.user.id!);
    }

    const deleteProduct = async(product: Product) => {
        await api.deleteProduct(product.id!);
        await productsByUser(product.user.id!);
    }

    return (
        <AuthContext.Provider value={{user, signin, register, signout, updateUser, productsByUser, addProduct, updateProduct, deleteProduct, updatePassword}}>
            {children}
        </AuthContext.Provider>
    );
}