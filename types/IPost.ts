import {IUser} from "@/types/IUser";

export interface IPost {
    _id: string;
    images: any[];
    prompt: string;
    tag: string;

    creator?: IUser;
}

export type IPostForm = Pick<IPost, 'prompt' | 'tag'> & {
    images: FileList;
};