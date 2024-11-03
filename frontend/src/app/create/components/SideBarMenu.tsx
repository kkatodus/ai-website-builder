import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

type sessionType = {
  id: string;
  name: string;
};

type SideBarMenuProps = {
  sessions: sessionType[];
  isOpen: boolean;
};

export default function SideBarMenu(props: SideBarMenuProps) {
  const { isOpen, sessions } = props;
  const router = useRouter();
  return (
    <div
      className={`h-full fixed z-[1000] w-1/6 bg-white border-r-2 border-black flex flex-col items-center justify-around transition-all duration-200 pt-20 ${
        isOpen ? "left-0" : "left-[calc(-1/6*100%)]"
      }`}
    >
      <div className="h-[90%] w-full border-2 border-black border-solid overflow-y-scroll overflow-x-clip">
        {sessions.map((session: sessionType) => (
          <div
            key={session.id}
            className="w-full p-2 border-b-2 mt-3 border-gray-500 duration-300 bg-white hover:bg-gray-300 cursor-pointer"
          >
            {session.name}
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
