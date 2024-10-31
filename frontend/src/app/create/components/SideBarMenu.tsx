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
  return (
    <div
      className={`h-full fixed z-[1000] w-1/6 bg-white border-r-2 border-black flex flex-col items-center justify-start transition-all duration-200 pt-20 ${
        isOpen ? "left-0" : "left-[calc(-1/6*100%)]"
      }`}
    >
      {sessions.map((session: sessionType) => (
        <div
          key={session.id}
          className="w-full p-2 border-b-2 mt-3 border-gray-500 duration-300 bg-white hover:bg-gray-300 cursor-pointer"
        >
          {session.name}
        </div>
      ))}
    </div>
  );
}
