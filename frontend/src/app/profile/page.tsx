"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  const userEmail = "user@example.com";
  const router = useRouter();
  return (
    <div className="w-full h-full absolute">
      <div className="text-4xl m-2 flex items-center">
        <FaHome
          className="text-4xl cursor-pointer transition-all duration-300 hover:text-gray-400 text-black"
          onClick={() => {
            router.push("/create");
          }}
        />
        <h1 className="mx-2">Profile</h1>
      </div>
      <hr />
      <div className="p-10">
        <h2 className="text-xl">Email</h2>
        <p className="text-lg">{userEmail}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
