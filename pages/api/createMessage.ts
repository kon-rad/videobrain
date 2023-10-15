import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages } = req.body;

  // Define your API key and other parameters
  const PULZE_API_KEY = process.env.NEXT_PUBLIC_PULZE_API_KEY;
  const apiUrl = "https://api.pulze.ai/v1/completions/";

  // Define the request headers and data
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${PULZE_API_KEY}`,
    "Pulze-Labels": JSON.stringify({ hello: "world" }),
  };

  const data = {
    model: "pulze-v0",
    prompt: JSON.stringify(messages),
    // prompt: messages,
    max_tokens: 1000,
    temperature: 0.7,
  };
  console.log("request: ", data);

  // Make the HTTP request
  try {
    const response = await axios.post(apiUrl, data, { headers });
    console.log("Response:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: error.message });
  }
}
