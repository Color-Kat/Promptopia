'use client';

import React, {memo, FC, useState, ChangeEvent, useEffect} from 'react';
import {PromptCard} from "@components/PromptCard";
import {IPost} from "@/types/IPost";

const PromptCardList: FC<{
    posts: IPost[],
    handleTagClick: () => void
}> = ({
          posts,
          handleTagClick
      }) => {
    return (
        <div className="mt-16 prompt_layout">
            {posts.map(post => (
                <PromptCard
                    post={post}
                    handleTagClick={handleTagClick}
                    key={post._id}
                />
            ))}
        </div>
    );
}

interface FeedProps {

}

export const Feed: FC<FeedProps> = memo(({}) => {

    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {

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
                />
            </form>

            <PromptCardList
                posts={posts}
                handleTagClick={() => {

                }}
            />
        </section>
    );
});