'use client';

import {NextPage} from 'next';
import {useRouter, useSearchParams} from "next/navigation";
import {Form} from "@components/Form";
import {FormEvent, useEffect, useState} from "react";
import {IPost} from "@/types/IPost";
import {useSession} from "next-auth/react";
import prompt from "@models/prompt";

const UpdatePrompt: NextPage = ({}) => {
    const promptId = useSearchParams().get('id');

    const {data: session} = useSession();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<Pick<IPost, 'prompt' | 'tag'>>({
        prompt: "",
        tag: "",
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }

        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID not found');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            });

            if (response.ok) router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="w-full">
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </div>
    );
};

export default UpdatePrompt