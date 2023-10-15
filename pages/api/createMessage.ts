import { NextApiRequest, NextApiResponse } from "next";
// import { Configuration, OpenAIApi } from "openai";
import { Configuration, OpenAIAPI } from "openai"
export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages } = req.body;
  // const apiKey = process.env.NEXT_PUBLIC_PULZE_API_KEY;
  // const url = "https://api.pulze.ai/v1/completions/";

  // Create a new instance of the OpenAI Configuration
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_PULZE_API_KEY,
    basePath: "https://api.pulze.ai/v1", // enter Pulze's URL
  });

  // Create a new instance of the OpenAI API
  const openai = new OpenAIApi(configuration);

  // const body = JSON.stringify({
  //   messages,
  //   model: "pulze-v0",
  //   stream: false,
  // });

  try {
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${apiKey}`,
    //   },
    //   body,
    // });
    // const data = await response.json();
    // console.log("createmessage response: ", data);
    // res.status(200).json({ data });

    // Call the chat completion API
    const chatCompletion = await openai.createChatCompletion({
      messages: [{ role: "user", content: messages }],
      model: "pulze-v0",
    });
    console.log("inside create message chatCompletion", chatCompletion);

    res.status(200).json(chatCompletion.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
