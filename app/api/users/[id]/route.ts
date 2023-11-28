import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import User from "@models/user";
import {NextRequest} from "next/server";

export const GET = async (
    request: Request | NextRequest,
    {params}: {params: {id: string}}
) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);

        if(!user) return new Response('User not found', {
            status: 404
        });

        return new Response(JSON.stringify(user), {
            status: 200
        });
    }catch (error) {
        console.log(error)
        return new Response('Failed to fetch user data', {
            status: 500
        });
    }
}

