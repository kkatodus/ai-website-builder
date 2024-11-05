"use client";
import React, { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import ChatPanel from "./components/ChatPanel";
import CodingPanel from "./components/CodingPanel";
import PreviewPanel from "./components/PreviewPanel";
import SideBarMenu from "./components/SideBarMenu";
import useLoginState from "../hooks/useLoginState";
import withAuth from "../auth/withAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { sessionType } from "../types/sessionTypes";
import TitleEditor from "./components/titleEditor";
const backendAPI = process.env.NEXT_PUBLIC_BACKEND_URL;

function CreatePage() {
  const router = useRouter();
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const { loginState } = useLoginState();
  const [sessions, setSessions] = useState<sessionType[]>([]);
  const [currentSession, setCurrentSession] = useState<sessionType>(
    sessions[0] || ({} as sessionType)
  );
  const createNewSession = async () => {
    const endpoint = `${backendAPI}/session/create`;
    const data = JSON.stringify({
      title: "Untitled",
      htmlCode: "",
      cssCode: "",
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: endpoint,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginState.token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        fetchAllSessions();
        setCurrentSession(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchAllSessions = async () => {
    const endPoint = `${backendAPI}/session/get`;

    const config = {
      method: "get",
      url: endPoint,
      headers: {
        Authorization: `Bearer ${loginState.token}`,
      },
    };
    axios
      .request(config)
      .then((res) => {
        setSessions(res.data);
      })
      .catch((err) => {
        console.error(err);
        router.push("/login");
      });
  };

  const refetchSessionId = async (sessionId: string) => {
    const endPoint = `${backendAPI}/session/get/${sessionId}`;

    const config = {
      method: "get",
      url: endPoint,
      headers: {
        Authorization: `Bearer ${loginState.token}`,
      },
    };
    axios
      .request(config)
      .then((res) => {
        setCurrentSession(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setCurrentSessionById = (sessionId: string) => {
    const session = sessions.find((session) => session._id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const setHtml = (html: string) => {
    setCurrentSession({ ...currentSession, htmlCode: html });
  };

  const setCSS = (css: string) => {
    setCurrentSession({ ...currentSession, cssCode: css });
  };

  const setTitle = (title: string) => {
    setCurrentSession({ ...currentSession, title: title });
  };

  // code to update the current session in the backend everytime it changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      const endpoint = `${backendAPI}/session/update/${currentSession._id}`;
      const data = JSON.stringify(currentSession);
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: endpoint,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginState.token}`,
        },
        data: data,
      };
      axios
        .request(config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          fetchAllSessions();
        });
    }, 1000);
    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession, loginState.token]);

  useEffect(() => {
    if (loginState.token) {
      fetchAllSessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState.token, router]);

  return (
    <div className="h-[100%] w-full bg-white absolute border-2 border-solid flex overflow-clip">
      <SideBarMenu
        isOpen={isChatMenuOpen}
        sessions={sessions}
        setCurrentSessionById={setCurrentSessionById}
        createNewSession={createNewSession}
        setIsChatMenuOpen={setIsChatMenuOpen}
      />
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
          <TitleEditor title={currentSession.title} setTitle={setTitle} />
        </div>
        <div className="flex h-[45%]">
          <CodingPanel
            code={currentSession.htmlCode}
            setCode={setHtml}
            language="html"
          />
          <CodingPanel
            code={currentSession.cssCode}
            setCode={setCSS}
            language="css"
          />
        </div>
        <div className="w-full h-[55%] border-t-2 border-black">
          <ChatPanel
            curHTML={currentSession.htmlCode}
            curCSS={currentSession.cssCode}
            currentSession={currentSession}
            sessionID={currentSession._id}
            refetchSessionId={refetchSessionId}
          />
        </div>
      </div>

      <div className="h-full w-[40%] border-l-2 border-solid border-black">
        <PreviewPanel
          html={currentSession.htmlCode}
          css={currentSession.cssCode}
        />
      </div>
    </div>
  );
}

export default withAuth(CreatePage);
