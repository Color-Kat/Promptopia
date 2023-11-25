import {IUser} from "@/types/IUser";

export interface IPost {
    _id: string;
    prompt: string;
    tag: string;

    creator?: IUser;
}