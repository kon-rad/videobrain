import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="max-w-xl m-4 my-8">
        <div className="flex flex-col">
          <h1 className="text-xl mb-3">
            VideoBrain - You can now chat with videos
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
