import React from "react";
import SignupModal from "./modals/SignupModal";

export default function SignupPrompt() {
  return (
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
        <button
          className="w-full h-[40px] md:w-[88px] md:h-[40px] md:text-sm text-md
            font-bold text-white border-2 border-gray-100 rounded-full
             hover:bg-white hover:bg-opacity-25 transition"
        >
          Log In
        </button>
        <SignupModal />
      </div>
    </div>
  );
}
