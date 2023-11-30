import {IUser} from "@/types/IUser";

export interface IPost {
    _id: string;
    image: string;
    prompt: string;
    tag: string;

    creator?: IUser;
}

export type IPostForm = Pick<IPost, 'prompt' | 'tag'> & {
    image: FileList[0] | null;
};