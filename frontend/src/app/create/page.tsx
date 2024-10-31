"use client";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import ChatPanel from "./components/ChatPanel";
import CodingPanel from "./components/CodingPanel";
import PreviewPanel from "./components/PreviewPanel";
import SideBarMenu from "./components/SideBarMenu";

export default function CreatePage() {
  const [title, setTitle] = useState("Create Page");
  console.log(setTitle);
  const [html, setHTML] = useState(
    "\
	<div>\
		<h1>Hello, world!</h1>\
		<p>Welcome to the Create page.</p>\
	</div>"
  );
  const [css, setCSS] = useState("div { background-color: coral; }");
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: "1",
      type: "bot",
      message: "Hello! How can I help you today?",
    },
    { type: "user", message: "I need help with CSS.", id: "2" },
    {
      type: "bot",
      message: "Sure! What do you need help with?",
      id: "3",
    },
    { type: "user", message: "I need help with CSS.", id: "4" },
    { type: "bot", message: "Sure! What do you need help with?", id: "5" },
    { type: "user", message: "I need help with CSS.", id: "6" },
    { type: "bot", message: "Sure! What do you need help with?", id: "7" },
  ]);
  console.log(setChatHistory);
  const sessions = [
    { id: "1", name: "Session 1" },
    { id: "2", name: "Session 2" },
    { id: "3", name: "Session 3" },
  ];

  return (
    <div className="h-[100%] w-full bg-white absolute border-2 border-solid flex">
      <SideBarMenu isOpen={isChatMenuOpen} sessions={sessions} />
      <div className="h-screen w-[60%] flex flex-col relative">
        <div className="w-full h-[10%] flex items-center border-b-2 border-solid border-black">
          <button className="relative w-10 h-10 p-2 rounded-sm transition-all duration-300 ease-in-out z-[1000] bg-slate-200 hover:bg-slate-400">
            <CiMenuBurger
              className="w-full h-full"
              onClick={() => {
                setIsChatMenuOpen(!isChatMenuOpen);
              }}
            />
          </button>
          <h1 className="pl-2">{title}</h1>
        </div>
        <div className="flex h-[45%]">
          <CodingPanel code={html} setCode={setHTML} language="html" />
          <CodingPanel code={css} setCode={setCSS} language="css" />
        </div>
        <div className="w-full h-[55%] border-t-2 border-black">
          <ChatPanel html={html} css={css} chatHistory={chatHistory} />
        </div>
      </div>

      <div className="h-full w-[40%] border-l-2 border-solid border-black">
        <PreviewPanel html={html} css={css} />
      </div>
    </div>
  );
}
