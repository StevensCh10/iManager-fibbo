import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";

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
        if(data){
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data)); 
        }
        return data;
    }

    return (
        <AuthContext.Provider value={{user, signin, register}}>
            {children}
        </AuthContext.Provider>
    );
}