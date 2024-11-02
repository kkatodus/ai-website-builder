import { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import axios from "axios";
import { GridLoader } from "react-spinners";
const backendAPI = process.env.NEXT_PUBLIC_BACKEND_URL;

type ChatPanelProps = {
  curHTML: string;
  curCSS: string;
  chatHistory: { type: string; message: string; id: string }[];
  setHtml: (html: string) => void;
  setCss: (css: string) => void;
  setChatHistory: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        message: string;
        id: string;
      }[]
    >
  >;
};

export default function ChatPanel(props: ChatPanelProps) {
  const { curHTML, curCSS, chatHistory, setChatHistory, setCss, setHtml } =
    props;
  const [message, setMessage] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const onMessageSubmit = () => {
    setSubmitDisabled(true);
    console.log("submitDisabled", submitDisabled);

    const data = JSON.stringify({
      curHTML: curHTML,
      curCSS: curCSS,
      userReq: message,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${backendAPI}/chat/gpt-completion`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        const { response, html, css } = res.data;

        setChatHistory([
          ...chatHistory,
          {
            type: "user",
            message: message,
            id: (chatHistory.length + 1).toString(),
          },
          {
            type: "bot",
            message: response,
            id: (chatHistory.length + 2).toString(),
          },
        ]);
        setHtml(html);
        setCss(css);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitDisabled(false);
        setMessage("");
      });
  };
  return (
    <div className="bg-white h-full relative">
      <div className="h-[80%] overflow-y-scroll">
        {chatHistory.map((chat) => {
          return (
            <div
              key={chat.id}
              className={`flex ${
                chat.type == "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`${
                  chat.type === "bot"
                    ? "bg-[#201f1f]  text-white"
                    : "bg-[#F4F4F4]  text-black"
                } p-4 m-4 rounded-xl`}
              >
                {chat.message}
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[20%] flex items-center justify-center">
        <div className="flex bg-[#F4F4F4] relative w-[80%] h-90 p-4 justify-around rounded-xl">
          <input
            className="w-[80%] bg-[#F4F4F4]"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          {submitDisabled ? (
            <GridLoader size={5} />
          ) : (
            <button
              className={`text-4xl duration-200 ease-in-out transition-all text-black hover:text-gray-400 ${
                submitDisabled
                  ? "cursor-not-allowed text-gray-400"
                  : "cursor-pointer"
              }`}
              disabled={submitDisabled}
              onClick={onMessageSubmit}
            >
              <FaArrowCircleUp />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
