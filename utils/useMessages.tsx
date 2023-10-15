import { useToast } from "@apideck/components";
import { ChatCompletionRequestMessage } from "openai";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { sendMessage } from "./sendMessage";

interface ContextProps {
  messages: ChatCompletionRequestMessage[];
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
}

const ChatsContext = createContext<Partial<ContextProps>>({});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  useEffect(() => {
    const initializeChat = () => {
      const systemMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are ChatGPT, a large language model trained by OpenAI.",
      };
      const welcomeMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: "I am the Ai Engineer Summit Video Brain. ask me anything!",
      };
      setMessages([systemMessage, welcomeMessage]);
    };

    // When no messages are present, we initialize the chat the system message and the welcome message
    // We hide the system message from the user in the UI
    if (!messages?.length) {
      initializeChat();
    }
  }, [messages?.length, setMessages]);

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true);
    try {
      const newMessage: ChatCompletionRequestMessage = {
        role: "user",
        content,
      };
      console.log("sending  message: ", content);
      const newMessages = [...messages, newMessage];
      // const newMessages = [newMessage];

      // Add the user message to the state so we can see it immediately
      setMessages(newMessages);

      const data = await sendMessage(newMessage);
      console.log("landed data", data);

      const reply = data.choices[0].text;

      console.log(":reply ", reply);
      // Add the assistant message to the state
      setMessages([...newMessages, { content: reply, role: "assistant" }]);
    } catch (error) {
      // Show error when something goes wrong
      addToast({ title: "An error occurred", type: "error" });
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  );
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps;
};
