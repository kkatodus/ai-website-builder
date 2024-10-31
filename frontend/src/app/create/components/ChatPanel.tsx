import { FaArrowCircleUp } from "react-icons/fa";

type ChatPanelProps = {
  html: string;
  css: string;
  chatHistory: { type: string; message: string; id: string }[];
};

export default function ChatPanel(props: ChatPanelProps) {
  const { html, css, chatHistory } = props;
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
          <input className="w-[80%] bg-[#F4F4F4]" />
          <button className="text-4xl">
            <FaArrowCircleUp />
          </button>
        </div>
      </div>
    </div>
  );
}
