import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../../lib/authContext";
import { useState } from "react";
import TwelveLabsApi from "../../lib/twelveLabsApi";
import { VideoContents } from "../../components/VideoContents";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const CreateSpace: NextPage = () => {
  const [video, setVideo] = useState({ data: null, isLoading: true });
  const INDEX_ID = process.env.NEXT_PUBLIC_INDEX_ID;

  const [youtubeUrlValue, setYoutubeUrlValue] = useState(
    "https://www.youtube.com/watch?v=eFTHIBYFEUg&ab_channel=SiliconValleyGirl"
  );
  const [searchQuery, setsearchQuery] = useState("flying car");
  const { user, loading } = useAuth();

  const handleYoutubeUrlValue = (e) => {
    console.log("e: ", e);
    setYoutubeUrlValue(e.target.value);
  };
  const handleSearchQuery = (e) => {
    console.log("setsearchQuery e: ", e);
    setsearchQuery(e.target.value);
  };

  const searchVideo = async () => {
    const SEARCH_URL = `${API_URL}/search`;
    const data = JSON.stringify({
      query: searchQuery,
      index_id: INDEX_ID,
      search_options: ["visual"],
    });
    const config = {
      method: "post",
      url: SEARCH_URL,
      // headers: headers,
      data: data,
    };
    const resp = await axios(config);
    const response = await resp.data;
    console.log(`Status code: ${resp.status}`);
    console.log(response);
  };

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await TwelveLabsApi.getFirstVideo(INDEX_ID);
        if (response && response?.length > 0 && response[0]["_id"]) {
          const videoId = response[0]["_id"];
          const videoDetail = await TwelveLabsApi.getVideo(INDEX_ID, videoId);
          setVideo({ data: videoDetail, isLoading: false });
        } else {
          setVideo({ data: null, isLoading: false });
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        setVideo({ data: null, isLoading: false });
      }
    }
    fetchVideo();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1>Login or Sign up!</h1>;

  // if (video.isLoading) {
  //   return <p>Loading...</p>;
  // }
  console.log("video: ", video);

  return (
    <>
      <Head>
        {" "}
        <title>Video</title>
      </Head>

      <main className="m-4 flex flex-col">
        <h1 className="text-2xl my-2 ">Search and Summarize Video</h1>
        <div className="max-w-md flex flex-col">
          <label className="text-lg py-4">youtube url</label>
          <input
            type="text"
            value={youtubeUrlValue}
            onChange={handleYoutubeUrlValue}
            className="py-2 px-6 border border-rounded"
          ></input>
        </div>
        <button className="my-4 py-1 px-6 bg-yellow-500 border rounded w-24">
          create
        </button>
        <div className="max-w-md flex flex-col">
          <label className="text-lg py-4">Search Video Library</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQuery}
            className="py-2 px-6 border border-rounded"
          ></input>
        </div>
        <button
          onClick={searchVideo}
          className="my-4 py-1 px-6 bg-yellow-500 border rounded w-24"
        >
          search
        </button>
        <h1 className="my-4 text-2xl">{video?.data?.source?.name}</h1>
        <a
          href={video?.data?.source?.url}
          className="my-2 text-sm text-blue-400"
          target="_blank"
        >
          {video?.data?.source?.url}
        </a>
        <VideoContents video={video} />
      </main>
    </>
  );
};

export default CreateSpace;
