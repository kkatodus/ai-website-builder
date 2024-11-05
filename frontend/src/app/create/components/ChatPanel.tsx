import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import axios from "axios";
import { GridLoader } from "react-spinners";
import { sessionType } from "@/app/types/sessionTypes";
import useLoginState from "@/app/hooks/useLoginState";
const backendAPI = process.env.NEXT_PUBLIC_BACKEND_URL;

type ChatPanelProps = {
  curHTML: string;
  curCSS: string;
  sessionID: string;
  currentSession: sessionType;
  refetchSessionId: (sessionId: string) => void;
};

export default function ChatPanel(props: ChatPanelProps) {
  const { currentSession, sessionID, refetchSessionId } = props;
  const [message, setMessage] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const { loginState } = useLoginState();

  useEffect(() => {
    const scrollReference = document.getElementById("scroll-reference");
    if (scrollReference) {
      scrollReference.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSession]);

  const onMessageSubmit = () => {
    setSubmitDisabled(true);

    const data = JSON.stringify({
      curHTML: currentSession.htmlCode,
      curCSS: currentSession.cssCode,
      userReq: message,
      sessionID: sessionID,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${backendAPI}/chat/gpt-completion`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginState.token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        refetchSessionId(sessionID);
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
        {currentSession.conversationHistory?.map((chat) => {
          return (
            <div
              key={chat._id}
              className={`flex ${
                chat.creator == "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`${
                  chat.creator === "bot"
                    ? "bg-[#201f1f]  text-white"
                    : "bg-[#F4F4F4]  text-black"
                } p-4 m-4 rounded-xl`}
              >
                {chat.message}
              </div>
            </div>
          );
        })}
        <div id="scroll-reference" />
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
