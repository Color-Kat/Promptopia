import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import {NextApiHandler, NextApiRequest} from "next";

// GET (read)
export const GET: NextApiHandler = async (
    request,
    response
) => {
    try {
        await connectToDB();

        const prompt = await Prompt
            .findById(request.query.id)
            .populate('creator');

        if(!prompt) return new Response('Prompt not found', {status: 200});

        return new Response(JSON.stringify(prompt), {
            status: 200
        });
    }catch (error) {
        return new Response('Failed to fetch prompt', {
            status: 200
        });
    }
}


// PATCH (update)
export const PATCH: NextApiHandler = async (
    request,
) => {
    const {prompt, tag} = await request.body.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(
            request.query.id
        );

        if(!existingPrompt) return new Response('Prompt not found', {status: 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});
    } catch (error) {
        return new Response('Failed to update prompt', {status: 500});
    }
}

// DELETE (delete)
export const DELETE: NextApiHandler = async (request) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(request.query.id);

        return new Response('Prompt deleted successfully', {status: 200});
    } catch (error) {
        return new Response('Failed to delete prompt', {status: 500});
    }
}