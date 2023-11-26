'use client';

import React, {memo, FC, useState, useCallback} from 'react';
import {IPost} from "@/types/IPost";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";

interface PromptCardProps {
    post: IPost;
    handleEdit?: () => void;
    handleDelete?: () => void;
}

export const PromptCard: FC<PromptCardProps> = memo(({
                                                         post,
                                                         handleEdit,
                                                         handleDelete
                                                     }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const {data: session} = useSession();
    const pathname = usePathname();

    const [copied, setCopied] = useState('');

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);

        setTimeout(() => setCopied(''), 2000);
    }

    const handleTagClick = useCallback(() => {
        const params = new URLSearchParams(searchParams); // take old search params
        params.set('tag', post.tag); // and change value of the tag filter

        router.push(`/?${params}`);
    }, []);

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                {post.creator &&
                    <Link href={`/profile/${post.creator._id}`}>
                    <div
                        className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
                    >
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
                    </Link>
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
                onClick={handleTagClick}
            >
                #{post.tag}
            </p>

            {/* User action buttons */}
            {session?.user.id === post.creator?._id && pathname == '/profile' &&(
                <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
                    <p
                        className="font-inter text-sm green_gradient cursor-pointer"
                        onClick={handleEdit}
                    >
                        Edit
                    </p>

                    <p
                        className="font-inter text-sm orange_gradient cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}

        </div>
    );
});