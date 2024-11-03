"use client";
import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import ChatPanel from "./components/ChatPanel";
import CodingPanel from "./components/CodingPanel";
import PreviewPanel from "./components/PreviewPanel";
import SideBarMenu from "./components/SideBarMenu";
import useLoginState from "../useLoginState";
import withAuth from "../auth/withAuth";

function CreatePage() {
  const [title, setTitle] = useState("Create Page");
  console.log(setTitle);
  const [html, setHTML] = useState("");
  const [css, setCSS] = useState("");
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const { loginState, updateLoginState } = useLoginState();
  console.log(loginState);
  const sessions = [
    { id: "1", name: "Session 1" },
    { id: "2", name: "Session 2" },
    { id: "3", name: "Session 3" },
  ];

  return (
    <div className="h-[100%] w-full bg-white absolute border-2 border-solid flex overflow-clip">
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
          <ChatPanel
            curHTML={html}
            curCSS={css}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            setHtml={setHTML}
            setCss={setCSS}
          />
        </div>
      </div>

      <div className="h-full w-[40%] border-l-2 border-solid border-black">
        <PreviewPanel html={html} css={css} />
      </div>
    </div>
  );
}

export default withAuth(CreatePage);
