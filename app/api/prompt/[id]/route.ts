import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import {NextApiHandler, NextApiRequest} from "next";
import {getSession} from "next-auth/react";

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
    req,
) => {
    const {prompt, tag} = await req.body.json();

    try {
        await connectToDB();

        const session = await getSession({ req });

        const existingPrompt = await Prompt.findOne({
            id: req.query.id,
            creator: session?.user?.id
        });

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
export const DELETE: NextApiHandler = async (req) => {
    try {
        await connectToDB();

        // await Prompt.findByIdAndRemove(request.query.id);

        const session = await getSession({ req });

        await Prompt.find({
            _id: req.query.id,
            creator: session?.user?.id
        });

        return new Response('Prompt deleted successfully', {status: 200});
    } catch (error) {
        return new Response('Failed to delete prompt', {status: 500});
    }
}