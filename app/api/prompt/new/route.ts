import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import {NextRequest} from "next/server";

type ResponseData = {

}

export const POST = async (
    req: Request | NextRequest
) => {
    const {userId, prompt, tag} = await req.json();

    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            tag,
            prompt
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201
        });
    }catch (error) {
        return new Response('Failed to create a new prompt', {
            status: 500
        });
    }
}

