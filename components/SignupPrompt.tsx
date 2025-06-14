"use client";

import React from "react";
import SignupModal from "./modals/SignUpModal";
import LogInModal from "./modals/LogInModal";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function SignupPrompt() {
  const name = useSelector((state: RootState) => state.user.name);

  return (
    !name && (
      <div
        className="fixed w-full h-[80px] bg-[#f4af01] bottom-0
        flex justify-center items-center md:space-x-5 lg:justify-between
        lg:px-20 xl:px-40 2xl:px-80"
      >
        <div className="hidden md:flex flex-col text-white">
          <span className="font-bold text-xl">Say Heylo to everyone</span>
          <span>People on Heylo are the first to know.</span>
        </div>
        <div className="flex space-x-2 w-full md:w-fit p-3">
          <LogInModal />
          <SignupModal />
        </div>
      </div>
    )
  );
}
