import { User } from "./user";

export interface Post {
    id: number;
    content:string;
    googleId: string;
    google: User;
}
