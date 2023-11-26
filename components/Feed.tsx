'use client';

import React, {memo, FC, useState, ChangeEvent, useEffect, useCallback} from 'react';
import {PromptCard} from "@components/PromptCard";
import {IPost} from "@/types/IPost";
import {useRouter, useSearchParams} from "next/navigation";

const PromptCardList: FC<{
    posts: IPost[]
}> = ({
          posts
      }) => {
    return (
        <div className="mt-16 prompt_layout">
            {posts.map(post => (
                <PromptCard
                    post={post}
                    key={post._id}
                />
            ))}
        </div>
    );
}

interface FeedProps {

}

export const Feed: FC<FeedProps> = memo(({}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchText, setSearchText] = useState(searchParams.get('search') ?? '');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);

        const params = new URLSearchParams(searchParams); // take old search params
        params.set('search', e.target.value); // and change value of the tag filter

        router.push(`/?${params}`);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();

            setPosts(data);
        }

        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form
                className="relative w-full text-center"
            >
                <input
                    type="text"
                    placeholder="Seach for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                    autoFocus
                />
            </form>

            <PromptCardList
                posts={posts}
            />
        </section>
    );
});