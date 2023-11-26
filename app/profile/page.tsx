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
    const [posts, setPosts] = useState<IPost[]>([]);

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

    const handleDelete = async (post: IPost) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prmopt?");

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter(p => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error)
            }
        }
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