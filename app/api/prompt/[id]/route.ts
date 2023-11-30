import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import {NextApiRequest} from "next";
import {NextRequest} from "next/server";
import {writeFile} from "fs/promises";
import path from "path";


// GET (read)
export const GET = async (
    req: Request | NextRequest,
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
    req: Request | NextRequest,
    {params}: {params: {id: string}}
) => {
    try {
        const formData = await req.formData();

        // Get image file or previous path
        const image: FileList[0] | string = formData.get('image') as any;
        let filepath = '';

        if (image && typeof image !== 'string' && (image as any) !== 'null') {
            // Image is a new file, save it
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = Date.now() + image.name.replaceAll(" ", "_");
            filepath = "/uploads/prompts/" + filename;

            await writeFile(
                path.join(process.cwd(), "public/uploads/prompts/" + filename),
                buffer
            );
        } else if(image && typeof image === 'string' && image !== 'null') {
            filepath = image; // Image is previous path
        }

        await connectToDB();

        const existingPrompt = await Prompt.findOne({
            _id: params.id,
            // creator: session?.user?.id // I don't know how to get user...
        });

        if(!existingPrompt) return new Response('Prompt not found', {status: 404});

        existingPrompt.prompt = formData.get('prompt');
        existingPrompt.tag = formData.get('tag');
        existingPrompt.image = filepath;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response('Failed to update prompt', {status: 500});
    }
}

// DELETE (delete)
export const DELETE = async (
    req: Request | NextRequest,
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