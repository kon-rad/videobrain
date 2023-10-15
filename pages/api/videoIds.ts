import { NextApiRequest, NextApiResponse } from "next";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import fs from "fs";
import path from "path";

const saveDocsToFile = (docs: any) => {
  // Convert the docs to a string
  const docsString = JSON.stringify(docs);

  // Generate the timestamp
  const timestamp = new Date().toISOString().replace(/:/g, "-");

  // Specify the file path
  const fileName = `docs_${timestamp}.txt`;
  const filePath = path.join(process.cwd(), fileName);

  // Write the docs to the file
  fs.writeFile(filePath, docsString, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Docs saved to file successfully");
    }
  });
};
const getVideoTranscript = async (videoId: string) => {
  const loader = YoutubeLoader.createFromUrl(
    `https://www.youtube.com/watch?v=${videoId}`,
    {
      language: "en",
      addVideoInfo: true,
    }
  );

  const docs = await loader.load();

  console.log("docs: ", docs);
  saveDocsToFile(docs);

  return docs;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure we're handling a POST request
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed, use POST" });
  }

  const { videoIds } = req.body;

  // Validate the videoIds
  if (
    !Array.isArray(videoIds) ||
    !videoIds.every(
      (id) => typeof id === "string" && /^[a-zA-Z0-9_-]{11}$/.test(id)
    )
  ) {
    return res.status(400).json({ error: "Invalid videoIds" });
  }

  // Your logic here, e.g., fetch video details from YouTube API...
  const transcriptPromises = videoIds.map((id) => getVideoTranscript(id));
  const transcripts = await Promise.all(transcriptPromises);

  // Respond with a JSON object
  res.status(200).json({ data: transcripts });
}
