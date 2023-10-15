import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router"; // Import the useRouter hook

const SpaceList: NextPage = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const handleAIESummit = async () => {
    router.push("/space/aiesummit"); // Navigate to /space/aiesummit
  };

  return (
    <>
      <Head>
        {" "}
        <title>Spaces List</title>
      </Head>

      <main className="m-4 flex flex-col">
        <h1 className="text-2xl my-2 ">Spaces List</h1>
        <div className="my-2">
          <button
            className="bg-yellow-100 text-black active:bg-yellow-400 
          font-bold px-2 py-0 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-2"
            onClick={handleAIESummit}
          >
            Ai Engineer Summit
          </button>
        </div>
      </main>
    </>
  );
};

export default SpaceList;
