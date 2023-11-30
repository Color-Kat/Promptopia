import React, {memo, FC, Dispatch, SetStateAction, FormEvent} from 'react';
import {IPost, IPostForm} from "@/types/IPost";
import Link from "next/link";
import {ImageInput} from "@components/ImageInput";

interface FormProps {
    type: 'Create' | 'Edit';
    post: IPostForm;
    setPost: Dispatch<SetStateAction<IPostForm>>;
    submitting: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void

}

export const Form: FC<FormProps> = memo(({
                                             type,
                                             post,
                                             setPost,
                                             submitting,
                                             handleSubmit
                                         }) => {
    return (
        <section className="w-full max-w-full flex-start flex-col pb-16">
            <h1 className="head_text text-right">
                <span className="blue_gradient">{type} Post</span>
            </h1>

            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                <ImageInput
                    data={post}
                    setData={setPost}
                />

                {/* Prompt */}
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>

                    <textarea
                        value={post.prompt}
                        onChange={(e) => setPost({...post, prompt: e.target.value})}
                        placeholder="Write your prompt here..."
                        className="form_textarea"
                        required
                    />
                </label>

                {/*  Tag  */}
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag {' '}
                        <span className="font-normal text-gray-600">(#product, #webdevelopment, #idea)</span>
                    </span>

                    <input
                        value={post.tag}
                        onChange={(e) => setPost({...post, tag: e.target.value})}
                        placeholder="#tag"
                        className="form_input"
                        required
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm hover:text-gray-600">
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>

        </section>
    );
});