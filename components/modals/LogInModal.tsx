"use client";

import React, { useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeLogInModal, openLogInModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SignupModal() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isOpen = useSelector((state: RootState) => state.modals.logInModalOpen);

  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <button
        className="w-full h-[40px] md:w-[88px] md:h-[40px] md:text-sm text-md
            font-bold text-white border-2 border-gray-100 rounded-full
             hover:bg-white hover:bg-opacity-25 transition"
        onClick={() => dispatch(openLogInModal())}
      >
        Log In
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLogInModal())}
        className="flex justify-center items-center 
        "
      >
        <div
          className="w-full h-full sm:w-[600px] sm:h-fit bg-white
          sm:rounded-xl 
          "
        >
          <XMarkIcon
            className="w-7 mt-5 ms-5 cursor-pointer"
            onClick={() => dispatch(closeLogInModal())}
          />
          <form className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Log into Heylo</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                className="w-full h-[54px] border border-gray-200
                outline-none ps-3 rounded-[4px] focus:border-[#f4af01]
                transition"
                type="email"
                placeholder="Email"
              ></input>
              <div
                className="w-full h-[54px] border border-gray-200
                outline-none rounded-[4px] focus-within:border-[#f4af01]
                transition flex items-center overflow-hidden pr-3"
              >
                <input
                  className="w-full h-full ps-3 outline-none"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                ></input>
                <div
                  className="w-7 h-7 text-gray-400 cursor-pointer
                "
                  onClick={handleShowPassword}
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>
            <button
              className="bg-[#f4af01] text-white h-[48px]
                rounded-full shadow-md mb-5 w-full"
            >
              Log In
            </button>
            <span className="mb-5 text-sm text-center block">Or</span>
            <button
              className="bg-[#f4af01] text-white h-[48px]
                rounded-full shadow-md w-full"
            >
              Log In As Guest
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
