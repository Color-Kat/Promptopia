'use client';

import {NextPage} from 'next';
import {Profile} from "@components/Profile";
import {useEffect, useState} from "react";
import {IUser} from "@/types/IUser";
import {IPost} from "@/types/IPost";
import {useRouter, useSearchParams} from "next/navigation";

const UserProfile: NextPage<{params: {id: string}}> = ({params}) => {
    const userId = params.id;

    const [user, setUser] = useState<IUser | null>(null);
    const [posts, setPosts] = useState<IPost[]>([]);

    // Load user
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();

            setUser(data);
        }

        fetchUser();
    }, []);

    // Load posts of this user
    useEffect(() => {
        if(!user?._id) return;

        const fetchUserPosts = async () => {
            const response = await fetch(`/api/users/${user._id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        fetchUserPosts();
    }, [user?._id]);

    if(!user) return (
        <div className="flex-center font-medium font-inter text-xl">
            Загрузка...
        </div>
    );

    return (
        <Profile
            name={user.username}
            description="Epolore prompts of this user to get inspiration!"
            posts={posts}
        />
    );
};

export default UserProfile