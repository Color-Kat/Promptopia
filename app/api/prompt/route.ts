import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import {NextApiRequest} from "next";
import User from "@models/user";
import {NextRequest} from "next/server";

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const POST = async (
    request: Request | NextRequest
) => {
    try {
        await connectToDB();

        const {tag, search} = await request.json();

        let query: any = {$or: []};

        // Get user from search
        const user = search
            ? await User.findOne({ username: { $regex: '.*' + escapeRegExp(search) + '.*', $options: 'i'} })
            : null;

        // Create a query for filtering prompts
        if (search !== '') query.$or.push({tag: { $regex: '.*' + escapeRegExp(search) + '.*', $options: 'i'}});
        if (search !== '') query.$or.push({prompt: { $regex: '.*' + escapeRegExp(search) + '.*', $options: 'i'}});
        if (user) query.$or.push({creator: user?._id});

        // Clear $or...
        if(query.$or.length === 0) delete query.$or;

        const prompts = await Prompt
            .find(query)
            .populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    }catch (error) {
        console.log(error)
        return new Response('Failed to fetch all prompt', {
            status: 200
        });
    }
}

