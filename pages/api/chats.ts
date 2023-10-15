import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Retrieve the message value from the post body
  const { message } = req.body;

  // Create a new instance of the OpenAI Configuration
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_PULZE_API_KEY,
    basePath: "https://api.pulze.ai/v1", // enter Pulze's URL
  });

  // Create a new instance of the OpenAI API
  const openai = new OpenAIApi(configuration);

  try {
    // Call the chat completion API
    // const chatCompletion = await openai.createChatCompletion({
    //   messages: [{ role: "user", content: message }],
    //   model: "pulze-v0",
    // });
    // console.log("chatCompletion: ", chatCompletion)
    console.log("fail: ");

    // Return the chat completion response
    res.status(200).json(chatCompletion.data);
  } catch (error) {
    // Handle any errors that occur during the API call
    res.status(500).json({ error: "An error occurred" });
  }
}

const configuration = new Configuration({
  apiKey: "<$PULZE_API_KEY>", // supply your key however you choose
  basePath: "https://api.pulze.ai/v1", // enter Pulze's URL
});
const openai = new OpenAIApi(configuration);

const textCompletion = await openai.createCompletion({
  prompt: "Say Hello World!",
  model: "pulze-v0",
});
const chatCompletion = await openai.createChatCompletion({
  messages: [{ role: "user", content: "Say Hello World!" }],
  model: "pulze-v0",
});

console.log(textCompletion.data, chatCompletion.data);
