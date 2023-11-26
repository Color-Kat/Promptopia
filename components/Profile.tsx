import React, {memo, FC} from 'react';
import {IPost} from "@/types/IPost";
import {PromptCard} from "@components/PromptCard";

interface ProfileProps {
    name: string;
    description: string;
    posts: IPost[];
    handleEdit?: (post: IPost) => void;
    handleDelete?: (post: IPost) => void;
}

export const Profile: FC<ProfileProps> = memo(({
                                                   name,
                                                   description,
                                                   posts,
                                                   handleEdit,
                                                   handleDelete
                                               }) => {

    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name}</span> Profile
            </h1>

            <p className="desc text-left">
                {description}
            </p>

            <div className="mt-10 prompt_layout">
                {posts.map(post => (
                    <PromptCard
                        post={post}
                        key={post._id}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))}
            </div>
        </section>
    );
});