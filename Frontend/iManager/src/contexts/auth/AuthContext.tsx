import { createContext } from "react";
import { User } from "../../types/User";
import { Product } from "../../types/Product";

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    register: (newUser: User) => Promise<User>;
    signout: () => void;
    updateUser: (updatedUser: User) => void;
    productsByUser: (userID: number) => Promise<Product[]>;
    addProduct: (newProduct: Product) => Promise<Product>;
    updateProduct: (updatedProduct: Product) => void;
    updatePassword: (user: User, oldPassword: String, newPassword: String) => Promise<User>;
    deleteProduct: (product: Product) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);