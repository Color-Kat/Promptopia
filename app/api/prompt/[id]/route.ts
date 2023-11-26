import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import {NextApiHandler, NextApiRequest} from "next";
import {getSession, useSession} from "next-auth/react";
import {getServerSession} from "next-auth";


// GET (read)
export const GET = async (
    req: NextApiRequest,
    {params}: {params: {id: string}}
) => {
    try {
        await connectToDB();

        const prompt = await Prompt
            .findById(params.id)
            .populate('creator');

        if(!prompt) return new Response('Prompt not found', {status: 200});

        return new Response(JSON.stringify(prompt), {
            status: 200
        });
    }catch (error) {
        console.log(error);
        return new Response('Failed to fetch prompt', {
            status: 200
        });
    }
}

// PATCH (update)
export const PATCH = async (
    req: Request & NextApiRequest,
    {params}: {params: {id: string}}
) => {
    const {prompt, tag} = await req.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findOne({
            _id: params.id,
            // creator: session?.user?.id // I don't know how to get user...
        });

        if(!existingPrompt) return new Response('Prompt not found', {status: 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response('Failed to update prompt', {status: 500});
    }
}

// DELETE (delete)
export const DELETE = async (
    req: NextApiRequest,
    {params}: {params: {id: string}}
) => {
    try {
        await connectToDB();

        // await Prompt.findByIdAndRemove(request.query.id);


        await Prompt.find({
            _id: params.id,
            // creator: session?.user?.id // idk why i can't get session
        }).deleteOne();

        return new Response('Prompt deleted successfully', {status: 200});
    } catch (error) {
        console.log(error)
        return new Response('Failed to delete prompt', {status: 500});
    }
}