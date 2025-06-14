"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSignUpModal, openSignUpModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";
import { signInUser } from "@/redux/slices/userSlice";

export default function SignUpModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen
  );

  const dispatch: AppDispatch = useDispatch();

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        return;
      }

      //Handle redux actions
      dispatch(
        signInUser({
          name: "",
          username: currentUser.email!.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        className="w-full h-[40px] md:w-[88px] md:h-[40px] md:text-sm 
            font-bold bg-white rounded-full text-md"
        onClick={() => dispatch(openSignUpModal())}
      >
        Sign Up
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
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
            onClick={() => dispatch(closeSignUpModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create your account</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                className="w-full h-[54px] border border-gray-200
                outline-none ps-3 rounded-[4px] focus:border-[#f4af01]
                transition"
                type="text"
                placeholder="Name"
              ></input>
              <input
                className="w-full h-[54px] border border-gray-200
                outline-none ps-3 rounded-[4px] focus:border-[#f4af01]
                transition"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              onClick={() => handleSignUp()}
            >
              Sign Up
            </button>
            <span className="mb-5 text-sm text-center block">Or</span>
            <button
              className="bg-[#f4af01] text-white h-[48px]
                rounded-full shadow-md w-full"
            >
              Log In As Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
