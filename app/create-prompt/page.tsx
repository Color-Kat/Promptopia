'use client';

import {NextPage} from 'next';
import {useRouter} from "next/navigation";
import {Form} from "@components/Form";
import {FormEvent, useState} from "react";
import {IPost, IPostForm} from "@/types/IPost";
import {useSession} from "next-auth/react";
import {formFata} from "@/utilsformFata";
import {writeFile} from "fs/promises";
import path from "path";
import Prompt from "@models/prompt";

const CreatePrompt: NextPage = ({}) => {
    const {data: session} = useSession();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<IPostForm>({
        image: null,
        prompt: "",
        tag: "",
    });

    const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {

            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: formFata({
                    image: post.image,
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                })
            });

            if(response.ok) router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="w-full">
            <Form
                type="Create"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={createPrompt}
            />
        </div>
    );
};

export default CreatePrompt