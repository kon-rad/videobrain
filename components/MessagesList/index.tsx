import { useMessages } from "../../utils/useMessages";
import axios from "axios";
import { useEffect, useState } from "react";
import AudioPlayer from "../AudioPlayer";

const MessagesList = () => {
  const { messages, isLoadingAnswer } = useMessages();
  const [voiceId, setVoiceId] = useState("21m00Tcm4TlvDq8ikWAM");
  const [audioFiles, setAudioFiles] = useState([]);

  console.log("render messages: ", messages);

  useEffect(() => {
    const fetchVoiceId = async () => {
      try {
        const response = await axios.get(
          "https://api.elevenlabs.io/v1/voices",
          {
            headers: {
              accept: "application/json",
              "xi-api-key": process.env.NEXT_PUBLIC_ELEVEN_LABS_KEY,
            },
          }
        );

        console.log("voice res: ", response);
        const voiceId = response.data.voices[0].voice_id; // Assuming you want to use the first voice ID from the response
        setVoiceId(voiceId);
        console.log("voice res: ", voiceId);
      } catch (error) {
        console.error("Error fetching voice ID:", error);
      }
    };

    fetchVoiceId();
  }, []);
  useEffect(() => {
    // const fetchAudioFiles = async () => {
    //   const audioArray = [];
    //   for (let i = 0; i < messages.length; i++) {
    //     const message = messages[i];
    //     const audio = await fetchAudio(message.content.trim());
    //     // audioArray.push(URL.createObjectURL(audio));
    //     // audioArray.push(btoa(audio));
    //     // const blob = new Blob([audio], { type: "audio/mp3" });
    //     console.log("audio: ", audio);
    //     const blob = new Blob([audio.data], { type: "audio/mpeg" });
    //     const url = URL.createObjectURL(blob);
    //     audioArray.push(url);
    //   }
    //   setAudioFiles(audioArray);
    //   console.log("audioArray: ", audioArray);
    // };
    // fetchAudioFiles();
  }, [messages]);
  // const fetchAudio = async (textBody: string) => {
  //   console.log("fetchign audio for text: ", textBody);
  //   try {
  //     // if (!voiceId)
  //     const response = await axios.post(
  //       `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM`,
  //       {
  //         text: textBody,
  //         model_id: "eleven_monolingual_v1",
  //         voice_settings: {
  //           stability: 0.5,
  //           similarity_boost: 0.5,
  //         },
  //       },
  //       {
  //         headers: {
  //           accept: "audio/mp3",
  //           "xi-api-key": process.env.NEXT_PUBLIC_ELEVEN_LABS_KEY,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("audio fetch : response: ", response);
  //     // const audioUrl = response.data;

  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching audio:", error);
  //     return null;
  //   }
  // };

  return (
    <div className="max-w-3xl mx-auto pt-8">
      {messages?.map((message, i) => {
        const isUser = message.role === "user";
        if (message.role === "system") return null;
        return (
          <div
            id={`message-${i}`}
            className={`flex mb-4 fade-up ${
              isUser ? "justify-end" : "justify-start"
            } ${i === 1 ? "max-w-md" : ""}`}
            key={message.content}
          >
            {!isUser && (
              <img
                src="/assets/images/robot-icon.png"
                className="w-9 h-9 rounded-full"
                alt="avatar"
              />
            )}
            <div
              style={{ maxWidth: "calc(100% - 45px)" }}
              className={`group relative px-3 py-2 rounded-lg ${
                isUser
                  ? "mr-2 bg-purple-100 from-primary-700 to-primary-600 text-black-800"
                  : "ml-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              }`}
            >
              {message.content.trim()}
              <div className="flex flex-col my-2 pp-2">
                {!isUser && <AudioPlayer textBody={message.content.trim()} />}
              </div>
            </div>
            {isUser && (
              <img
                src="/assets/images/logo.png"
                className="w-9 h-9 rounded-full cursor-pointer"
                alt="avatar"
              />
            )}
          </div>
        );
      })}
      {isLoadingAnswer && (
        <div className="flex justify-start mb-4">
          <img
            src="/assets/images/robot-icon.png"
            className="w-9 h-9 rounded-full"
            alt="avatar"
          />
          <div className="loader ml-2 p-2.5 px-4 bg-gray-200 dark:bg-gray-800 rounded-full space-x-1.5 flex justify-between items-center relative">
            <span className="block w-3 h-3 rounded-full"></span>
            <span className="block w-3 h-3 rounded-full"></span>
            <span className="block w-3 h-3 rounded-full"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesList;
