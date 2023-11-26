'use client';

import {NextPage} from 'next';

import {Profile} from "@components/Profile";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {IPost} from "@/types/IPost";
import {useRouter} from "next/navigation";

const MyProfile: NextPage = ({}) => {
    const router = useRouter();

    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(!session?.user.id) return;

        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        fetchPosts();
    }, [session?.user.id]);

    const handleEdit = (post: IPost) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = (post: IPost) => {

    }

    return (
        <Profile
            name="My"
            description="Welcome to your personalized profile page!"
            posts={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;