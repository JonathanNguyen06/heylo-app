"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/slices/userSlice";
import { closeLogInModal, closeSignUpModal } from "@/redux/slices/modalSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ClickAwayListener, Popper } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SidebarUserInfo() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);

  const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen) {
      setAnchorEl(null);
      setIsOpen(false);
    } else {
      setAnchorEl(event.currentTarget);
      setIsOpen(true);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutUser());
        dispatch(closeLogInModal());
        dispatch(closeSignUpModal());
        setAnchorEl(null); // Close the Popper after successful sign out
      })
      .catch((err) => console.error("Sign out failed:", err));
    // Close the Popper after successful sign out
    setIsOpen(false);

    router.push("/");
  };

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;
    if (popperRef.current?.contains(target) || anchorEl?.contains(target)) {
      return;
    }
    setAnchorEl(null);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="absolute bottom-3 flex items-center space-x-2 justify-start
        hover:bg-gray-500 hover:bg-opacity-20 xl:p-3 xl:pe-6 
        rounded-full cursor-pointer transition w-fit xl:w-[240px]"
        onClick={handleToggle}
      >
        <Image
          src="/assets/guest-profile.png"
          width={36}
          height={36}
          alt="Profile Picture"
          className="w-9 h-9"
        />
        <div className="hidden xl:flex flex-col text-sm max-w-40">
          <span className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">
            {user.name}
          </span>
          <span className="whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
            @{user.username}
          </span>
        </div>
      </div>

      <Popper open={isOpen} anchorEl={anchorEl} placement="top">
        <ClickAwayListener onClickAway={handleClickAway}>
          <div
            ref={popperRef}
            className="border rounded-xl w-fit items-center justify-center flex flex-col shadow-md xl:w-[240px] text-sm xl:text-[17px] overflow-hidden bg-white"
          >
            <div className="w-full text-center py-2 hover:bg-gray-200 cursor-pointer border-b">
              Profile
            </div>
            <div
              className="w-full text-center py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                handleSignOut();
              }}
            >
              Sign Out
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
