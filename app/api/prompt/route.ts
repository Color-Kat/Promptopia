import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import {NextApiRequest} from "next";

export const POST = async (
    request: Request & NextApiRequest
) => {
    try {
        await connectToDB();

        const {tag, search} = await request.json();

        // Search Params
        // const searchParams = request.query;
        // const tag = 123;
        // const search = searchParams;
        //
        console.log(tag, search)

        let query: any = {};

        if (tag !== '') query.tag = tag;
        // if (search !== '') query['creator.username'] = {
        //     $regex: '.*' + search + '.*'
        // }

        console.log(query)

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

