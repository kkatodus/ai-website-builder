import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { sessionType } from "@/app/types/sessionTypes";
import { FaEdit } from "react-icons/fa";

type SideBarMenuProps = {
  sessions: sessionType[];
  isOpen: boolean;
  setCurrentSessionById: (sessionId: string) => void;
  createNewSession: () => void;
  setIsChatMenuOpen: (isOpen: boolean) => void;
};

export default function SideBarMenu(props: SideBarMenuProps) {
  const {
    isOpen,
    sessions,
    setCurrentSessionById,
    createNewSession,
    setIsChatMenuOpen,
  } = props;
  const router = useRouter();
  return (
    <div
      className={`h-full fixed z-[1000] w-1/6 bg-white border-r-2 border-black flex flex-col items-center justify-around transition-all duration-200 ${
        isOpen ? "left-0" : "left-[calc(-1/6*100%)]"
      }`}
    >
      <div className="flex w-full justify-end">
        <button
          className="relative h-10 ml-2 text-lg text-black hover:text-gray-200 transition-all duration-300"
          onClick={createNewSession}
        >
          <FaEdit className="text-3xl" />
        </button>
      </div>
      <div className="h-[90%] w-full overflow-y-scroll overflow-x-clip">
        {sessions.map((session: sessionType) => (
          <div
            key={session._id}
            className="w-full p-2 border-b-2 mt-3 border-gray-500 duration-300 bg-white hover:bg-gray-300 cursor-pointer"
            onClick={() => {
              setCurrentSessionById(session._id);
              setIsChatMenuOpen(false);
            }}
          >
            {session.title}
          </div>
        ))}
      </div>
      <div className="flex justify-items-start w-full p-3">
        <FaUser
          className="text-2xl cursor-pointer duration-400 hover:text-gray-300 text-black transition-all"
          onClick={() => {
            router.push("/profile");
          }}
        />
      </div>
    </div>
  );
}
