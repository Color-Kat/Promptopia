import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import {NextApiRequest} from "next";
import User from "@models/user";

export const POST = async (
    request: Request & NextApiRequest
) => {
    try {
        await connectToDB();

        const {tag, search} = await request.json();

        let query: any = {};

        // Get user from search
        const user = search
            ? await User.findOne({ username: { $regex: '.*' +search + '.*', $options: 'i'} })
            : null;

        // Create a query for filtering prompts
        if (tag !== '') query.tag = tag;
        if (search) query['creator'] = user?._id;

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

