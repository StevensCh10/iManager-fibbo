import { User } from "./User";

export type Product = {
    id?: number;
    name: string;
    description: string;
    code: string;
    user: User;
    price: number;
}