import { createContext } from "react";
import { User } from "../../types/User";

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    register: (newUser: User) => Promise<User>;
    signout: () => void;
    updateUser: (updatedUser: User) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);