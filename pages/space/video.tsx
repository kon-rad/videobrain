import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../../lib/authContext";
import { useState } from "react";
import TwelveLabsApi from "../../lib/twelveLabsApi";
import { VideoContents } from "../../components/VideoContents";

const CreateSpace: NextPage = () => {
  const [video, setVideo] = useState({ data: null, isLoading: true });
  const INDEX_ID = process.env.NEXT_PUBLIC_INDEX_ID;

  const [youtubeUrlValue, setYoutubeUrlValue] = useState(
    "https://www.youtube.com/watch?v=eFTHIBYFEUg&ab_channel=SiliconValleyGirl"
  );
  const { user, loading } = useAuth();

  const handleYoutubeUrlValue = (e) => {
    console.log("e: ", e);
    setYoutubeUrlValue(e.target.value);
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
        <h1 className="text-2xl my-2 ">create a space</h1>
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
            value={""}
            onChange={() => {}}
            className="py-2 px-6 border border-rounded"
          ></input>
        </div>
        <button className="my-4 py-1 px-6 bg-yellow-500 border rounded w-24">
          search
        </button>
        <VideoContents video={video} />
      </main>
    </>
  );
};

export default CreateSpace;
