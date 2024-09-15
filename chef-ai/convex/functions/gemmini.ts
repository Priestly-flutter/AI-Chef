import { httpRouter } from "convex/server";
import { httpAction } from "../_generated/server";
import { internal } from "../_generated/api";
import { Doc, Id } from "../_generated/dataModel";
// find out how to import gemini
import Gemini from "gemini"



const http = httpRouter();



function hasDelimiter(response: string) {
    return (
        response.includes("\n") ||
        response.includes(".") ||
        response.includes("?") ||
        response.includes("!") ||
        response.includes(",") ||
        response.length > 100 
    );
}

http.route({
    path: "/chat", // there's a next js path called chat that is incharge of displaying the response
    method: "POST",
    handler: httpAction(async (ctx,request) => {
        const body = await request.json();
        const messageId: Id<"aiMessages"> = body.messageId;
        const messages: Doc<"aiMessages"> = body.messages;
        const gemini = new Gemini(); //  confirm this peice of code

        // create a TransformStream to hanlde streaming data
        let { readable, writable } = new TransformStream();
        let writer = writable.getWriter();
        const textEncoder = new TextEncoder();


        const streamData = async () => {
            let content = "";
            try {
                // edit this code segment
                const stream = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content:
                                "Hello the bot",
                        },
                        ...messages.map(({ body, author }) => ({
                            role:
                                author === "ChatGPT"
                                ? ("assistant" as const)
                                : ("user" as const),
                            content: body,
                        })),
                    ],
                    stream: true,
                });

                // loop over the data as it is streamed and write to the writeable
                // also periodically update the message in the database
                for await (const part of stream) {
                    const text = part.choices[0]?.delta?.content || "";
                    content += text;
                    await writer.write(textEncoder.encode(text));
                    if (hasDelimiter(text)) {
                        await ctx.runMutation(internal.messages.update, {
                            messageId,
                            body: content,
                            isComplete: false,
                        });
                    }
                }
                await ctx.runMutation(internal.messages.update, {
                    messageId,
                    body: content,
                    isComplete: true,
                });
                await writer.close();
            } catch (e) {
                if (e instanceof OpenAI.APIError) {
                    console.error(e.status);
                    console.error(e.message);
                    await ctx.runMutation(internal.messages.update, {
                        messageId,
                        body: "OpenAI call failed: " + e.message,
                        isComplete: true,
                    });
                    return;
                } else{
                    throw e;
                }
            }
        };
        void streamData();

        // Send the readable back to the browser
        return new Response(readable, {
            // CORS headers -- https://docs.convex.dev/functions/http-actions#cors
            http.route({
                path: "/chat",
                method: "OPTIONS",
                handler: httpAction(async (_, request) => {
                    // Make sure the necessary header are present
                    // for this to be a valid pre-flight request
                    cosnt headers = request.headers;
                    if (
                        headers.get("Origin") !== null &&
                        headers.get("Access-Control-Request-Method") !== null &&
                        headers.get("Access-Control-Request-Headers") !== null
                    ) {
                        return new Response(null, {
                            headers: new Headers({
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "POST",
                                "Access-Control-Allow-Headers": "Content-Type, Digest",
                                "Access-Control-Max-Age": "86400",
                            }),
                        });
                    } else {
                        return new Response();
                    }
                }),
            });
        })
    })
})

export default http;