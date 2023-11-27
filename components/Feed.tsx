'use client';

import React, {memo, FC, useState, ChangeEvent, useEffect, useCallback} from 'react';
import {PromptCard} from "@components/PromptCard";
import {IPost} from "@/types/IPost";
import {useRouter, useSearchParams} from "next/navigation";
import {useDebounce} from "@/hooks/useDebounce";

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

export const Feed: FC<FeedProps> = ({}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [posts, setPosts] = useState([]);

    const [searchText, setSearchText] = useState(searchParams.get('search') ?? '');
    const debouncedValue = useDebounce<string>(searchText, 500)

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const fetchPosts = async (tag: string, search: string) => {
        const response = await fetch('/api/prompt', {
            method: 'POST',
            body: JSON.stringify({
                tag,
                search
            })
        });
        const data = await response.json();

        setPosts(data);
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams); // take old search params
        params.set('search', searchText); // and change the value of the tag filter

        fetchPosts(params.get('tag') ?? '', params.get('search') ?? '');
        router.replace('/?' + params);
    }, [debouncedValue])

    useEffect(() => {
        fetchPosts(searchParams.get('tag') ?? '', searchParams.get('search') ?? '');
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
};