'use client';

import {NextPage} from 'next';
import {useRouter} from "next/navigation";
import {Form} from "@components/Form";
import {useState} from "react";
import {IPost} from "@/types/IPost";

const CreatePrompt: NextPage = ({}) => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<IPost>({
        prompt: "",
        tag: "",
    });

    const createPrompt = async () => {

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