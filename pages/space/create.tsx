import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../../lib/authContext";
import ModalComponent from "../../components/ModalComponent";
import { useState } from "react";
import { getChannelVideos } from "../../lib/youtube/helpers";
import axios from "axios";

const CreateSpace: NextPage = () => {
  const [channelName, setChannelName] = useState("UCLKPca3kwwd-B59HNr-_lvA");
  const [videoResults, setVideoResults] = useState([]);
  const [transcripts, setTranscripts] = useState([]);
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1>U need to login</h1>;

  const handleChannelName = (e) => {
    console.log("e: ", e);
    setChannelName(e.target.value);
  };

  const handleImport = async () => {
    // const channelId = await getChannelIdFromUsername(channelName);
    // console.log("channelId: ", channelId);
    // const res: any = await getChannelVideos(channelName);

    const res = await getChannelVideos(channelName);
    console.log("res: ", res);
    setVideoResults(res);

    setTranscripts(await fetchVideoData(res.map((vid: any) => vid.videoId)));
  };

  const fetchVideoData = async (videoIds: string[]) => {
    try {
      const response = await axios.post("/api/videoIds", { videoIds });
      console.log("Response:", response.data.data);
      return response.data.data.map((item) => item[0]);
    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request", error.message);
      }
    }
  };

  console.log("transcripts: ", transcripts);
  console.log("videoResults: ", videoResults);

  return (
    <>
      <Head>
        {" "}
        <title>Create Space</title>
      </Head>

      <main className="m-4 flex flex-col">
        <h1 className="text-2xl my-2 ">create a space</h1>
        <div className="max-w-md flex flex-col">
          <label className="text-lg py-4">
            import videos using youtube channel id
          </label>
          <input
            type="text"
            placeholder="enter youtube channel id"
            value={channelName}
            onChange={handleChannelName}
            className="py-2 px-6 border border-rounded"
          ></input>
        </div>
        <div className="my-2">
          <button
            className="bg-yellow-100 text-black active:bg-yellow-400 
          font-bold px-2 py-0 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-2"
            onClick={handleImport}
          >
            get videos
          </button>
        </div>
      </main>
      <div className="flex flex-wrap my-4 p-4 border rounded-md">
        {videoResults.map((vid: any, i: number) => {
          console.log("rendering video result item: ", vid);
          return (
            <div
              key={`key-${vid.title}`}
              className="p-2 flex flex-col items-center w-1/3"
            >
              <h3 className="my-1 mx-3 text-md">{vid.title}</h3>
              <p className="my-1 mx-3 text-xs text-gray-400">{vid.videoId}</p>
              <img
                src={`${vid.thumbnail}`}
                alt="youtube thumbnail"
                className="my-2 mx-3 rounded-md"
              />
              <ModalComponent
                body={transcripts[i]?.pageContent}
                openButtonLabel="transcript"
                title={"transcripts"}
              />
              <button
                className="bg-green-100 text-black active:bg-green-400 
      font-bold px-2 py-0 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-2"
              >
                upload
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CreateSpace;
