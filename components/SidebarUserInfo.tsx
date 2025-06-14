"use client";

import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { signOutUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { closeLogInModal, closeSignUpModal } from "@/redux/slices/modalSlice";

export default function SidebarUserInfo() {
  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  async function handleSignOut() {
    signOut(auth);

    dispatch(signOutUser());

    dispatch(closeSignUpModal());
    dispatch(closeLogInModal());
  }

  return (
    <div
      className="absolute bottom-3 flex items-center space-x-2 justify-start
            hover:bg-gray-500 hover:bg-opacity-20 xl:p-3 xl:pe-6 
            rounded-full cursor-pointer transition w-fit xl:w-[240px]"
      onClick={() => handleSignOut()}
    >
      <Image
        src={"/assets/guest-profile.png"}
        width={36}
        height={36}
        alt="Profile Picture"
        className="w-9 h-9"
      />
      <div className="hidden xl:flex flex-col text-sm max-w-40">
        <span
          className="whitespace-nowrap text-ellipsis
        overflow-hidden font-bold"
        >
          {user.name}
        </span>
        <span
          className="whitespace-nowrap text-ellipsis
        overflow-hidden text-gray-500"
        >
          {user.username}
        </span>
      </div>
    </div>
  );
}
