"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import useLoginState from "../hooks/useLoginState";
import withAuth from "../auth/withAuth";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { loginState } = useLoginState();
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
      <div className="flex items-center">
        <div className="mx-2 flex flex-col item-center justify-center">
          <RiLogoutBoxFill className="text-4xl" />
          <p>Logout</p>
        </div>
        <div>
          <h2 className="text-xl">Email</h2>
          <p className="text-lg">{loginState.email}</p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
