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
    try {
        const formData = await req.formData();

        await connectToDB();

        const image: FileList[0] = formData.get('image') as any;
        let filepath = '';

        if (image && (image as any) !== 'null') {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = Date.now() + image.name.replaceAll(" ", "_");
            filepath = "/uploads/prompts/" + filename;

            await writeFile(
                path.join(process.cwd(), "public/uploads/prompts/" + filename),
                buffer
            );
        }

        const newPrompt = new Prompt({
            creator: formData.get('userId'),
            tag: formData.get('tag'),
            prompt: formData.get('prompt'),
            image: filepath
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

