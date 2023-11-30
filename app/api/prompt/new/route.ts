import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDB} from "@/utilsdatabase";
import Prompt from "@models/prompt";
import {NextRequest} from "next/server";
import {writeFile} from "fs/promises";
import path from "path";

type ResponseData = {

}

export const POST = async (
    req: Request | NextRequest
) => {
    const formData = await req.formData();

    try {
        await connectToDB();

        const image: FileList[0] = formData.get('image') as any;
        let filename = '';

        if (image) {
            const buffer = Buffer.from(await image.arrayBuffer());
            filename = Date.now() + image.name.replaceAll(" ", "_");

            await writeFile(
                path.join(process.cwd(), "public/uploads/prompts/" + filename),
                buffer
            );
        }

        const newPrompt = new Prompt({
            creator: formData.get('userId'),
            tag: formData.get('tag'),
            prompt: formData.get('prompt'),
            image: filename
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201
        });
    }catch (error) {
        console.log(error)
        return new Response('Failed to create a new prompt', {
            status: 500
        });
    }
}

