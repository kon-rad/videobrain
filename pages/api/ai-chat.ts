import { Configuration, OpenAIApi } from "openai";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_PULZE_API_KEY, // supply your key however you choose
    basePath: "https://api.pulze.ai/v1", // enter Pulze's URL
  });
  const openai = new OpenAIApi(configuration);

  const textCompletion = await openai.createCompletion({
    prompt: "Say Hello World, I love you babe! createCompletion",
    model: "pulze-v0",
  });
  const chatCompletion = await openai.createChatCompletion({
    messages: [{ role: "user", content: "Say Hello World!" }],
    model: "pulze-v0",
  });

  console.log(textCompletion.data, chatCompletion.data);

  res
    .status(200)
    .json({
      name: "John Doe",
      responsedata: [textCompletion.data, chatCompletion.data],
    });
}
