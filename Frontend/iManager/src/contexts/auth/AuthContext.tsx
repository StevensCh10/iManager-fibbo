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
    addProduct: (newProduct: Product) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (product: Product) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);