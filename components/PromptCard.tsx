import React, {memo, FC} from 'react';
import {IPost} from "@/types/IPost";

interface PromptCardProps {
    post: IPost,
    handleTagClick: () => void
}

export const PromptCard: FC<PromptCardProps> = memo(({
                                                         post,
                                                         handleTagClick
                                                     }) => {


    return (
        <div className="">
            PromptCard
        </div>
    );
});