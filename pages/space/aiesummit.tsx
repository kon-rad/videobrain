import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../../lib/authContext";
import ModalComponent from "../../components/ModalComponent";
import { useState } from "react";
import { getChannelVideos } from "../../lib/youtube/helpers";
import MessagesList from "../../components/MessagesList/index";
import MessageForm from "../../components/MessageForm";
import { MessagesProvider } from "../../utils/useMessages";

import { ModalProvider, ToastProvider } from "@apideck/components";
const AIESummit: NextPage = () => {
  return (
    <ToastProvider>
      <ModalProvider>
        <MessagesProvider>
          <>
            <Head>
              {" "}
              <title>Ai Engineer Summit</title>
            </Head>

            <main className="m-4 flex flex-col">
              <h1 className="text-2xl my-2 ">Ai Engineer Summit</h1>
            </main>
            <div className="flex flex-wrap my-4 p-4 border rounded-md">
              <MessagesList />
              <div className="fixed bottom-0 right-0 left-0">
                <MessageForm />
              </div>
            </div>
          </>
        </MessagesProvider>
      </ModalProvider>
    </ToastProvider>
  );
};

export default AIESummit;
