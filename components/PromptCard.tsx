'use client';

import React, {memo, FC, useState} from 'react';
import {IPost} from "@/types/IPost";
import Image from "next/image";

interface PromptCardProps {
    post: IPost;
    handleTagClick?: (tag: string) => void;
    handleEdit?: () => void;
    handleDelete?: () => void;
}

export const PromptCard: FC<PromptCardProps> = memo(({
                                                         post,
                                                         handleTagClick,
                                                         handleEdit,
                                                         handleDelete
                                                     }) => {

    const [copied, setCopied] = useState('');

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);

        setTimeout(() => setCopied(''), 2000);
    }

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                {post.creator &&
                    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                        <Image
                            src={post.creator.image}
                            alt="User_image"
                            width={40}
                            height={40}
                            className="rounded-full object-contain"
                        />

                        <div className="flex flex-col">
                            <h3 className="font-satoshi text-gray-900 font-semibold">
                                {post.creator.username}
                            </h3>
                            <p className="font-inter text-sm text-gray-500">
                                {post.creator.email}
                            </p>
                        </div>
                    </div>
                }

                <div
                    className="copy_btn"
                    onClick={handleCopy}
                >
                    <Image
                        src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        alt="Copy"
                        width={17}
                        height={17}
                    />
                </div>
            </div>

            <p className="my-4 font-satoshi text-gray-700">
                {post.prompt}
            </p>

            <p
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                {post.tag}
            </p>

        </div>
    );
});