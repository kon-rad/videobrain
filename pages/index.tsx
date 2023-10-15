import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="m-4 my-8">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-4xl mb-3">VideoBrain</h1>
          <h3 className="text-xl my-6">You can now chat with videos</h3>
          <img
            src="/assets/images/video-wall.png"
            alt=""
            className="my-8 max-w-lg rounded-xl shadow-md"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
