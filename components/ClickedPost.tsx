"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  ArrowUpTrayIcon,
  BookmarkIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openLogInModal } from "@/redux/slices/modalSlice";
import { db } from "@/firebase";
import {
  closeLoadingScreen,
  openLoadingScreen,
} from "@/redux/slices/loadingSlice";
import LoadingScreen from "./LoadingScreen";
import { ClickAwayListener, Popper } from "@mui/material";
import DeleteModal from "./modals/DeleteModal";

interface ClickedPostPostProps {
  post: DocumentData | undefined;
  id: string;
}

export default function ClickedPost({ post, id }: ClickedPostPostProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [postData, setPostData] = useState<DocumentData | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const canDelete = user.username && postData?.username === user.username;

  const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!user.username) {
      dispatch(openLogInModal());
      return;
    }
    if (isOpen) {
      setAnchorEl(null);
      setIsOpen(false);
    } else {
      setAnchorEl(event.currentTarget);
      setIsOpen(true);
    }
  };

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;
    if (popperRef.current?.contains(target) || anchorEl?.contains(target)) {
      return;
    }
    setAnchorEl(null);
    setIsOpen(false);
  };

  async function likePost() {
    if (!user.username) {
      dispatch(openLogInModal());
      return;
    }

    const postRef = doc(db, "posts", id);

    if (postData?.likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    }
  }

  useEffect(() => {
    const navEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    const isFirstLoad = navEntry.type === "reload";

    if (isFirstLoad) {
      dispatch(openLoadingScreen());

      const postRef = doc(db, "posts", id);
      const unsubscribe = onSnapshot(postRef, (docSnap) => {
        setPostData(docSnap.data());
        dispatch(closeLoadingScreen());
      });

      return () => unsubscribe();
    } else {
      const postRef = doc(db, "posts", id);
      const unsubscribe = onSnapshot(postRef, (docSnap) => {
        setPostData(docSnap.data());
      });

      return () => unsubscribe();
    }
  }, [id]);

  return (
    <>
      <div
        className="flex flex-col p-3 space-y-5 border-b 
          border-gray-100"
      >
        <div className="flex justify-between items-center mb-1.5">
          <div className="flex space-x-3">
            <Image
              src={"/assets/guest-profile.png"}
              width={44}
              height={44}
              alt="Profile Picture"
              className="w-[44px] h-[44px]"
            />
            <div className="flex flex-col text-[15px]">
              <span
                className="font-bold whitespace-nowrap overflow-hidden 
                    text-ellipsis inline-block max-w-[60px] 
                    min-[400px]:max-w-[100px] 
                    min-[500px]:max-w-[140px] sm:max-w-[160px]"
              >
                {post?.name}
              </span>
              <span
                className="text-[#707e89] whitespace-nowrap overflow-hidden 
                    text-ellipsis inline-block max-w-[60px] 
                    min-[400px]:max-w-[100px] 
                    min-[500px]:max-w-[140px] sm:max-w-[160px]"
              >
                @{post?.username}
              </span>
            </div>
          </div>
          <div className="cursor-pointer" onClick={handleToggle}>
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </div>
          <Popper open={isOpen} anchorEl={anchorEl} placement="bottom-end">
            <ClickAwayListener onClickAway={handleClickAway}>
              <div
                ref={popperRef}
                className="border rounded-xl w-fit items-center justify-center flex flex-col shadow-md xl:w-fit text-sm xl:text-[14px] overflow-hidden bg-white"
              >
                <div className="w-full text-center py-2 hover:bg-gray-100 cursor-pointer border-b flex items-center justify-center">
                  <BookmarkIcon className="hidden md:w-[30px] md:h-[14px] md:flex mr-0.5" />
                  <span className="md:mr-3 px-2 md:px-0">Bookmark</span>
                </div>
                {canDelete && <DeleteModal id={id} />}
              </div>
            </ClickAwayListener>
          </Popper>
        </div>
        <span className="text-[15px]">{post?.text}</span>
      </div>
      <div className="border-b border-gray-100 p-3 text-[15px]">
        <span className="font-bold">{postData?.likes.length}</span>{" "}
        {postData?.likes.length == 1 ? "like" : "likes"}
      </div>
      <div
        className="border-b border-gray-100 p-3 text-[15px]
          flex justify-evenly"
      >
        <ChatBubbleOvalLeftEllipsisIcon
          className="w-[22px] h-[22px]
            text-[#707389] cursor-not-allowed"
        />
        {postData?.likes.includes(user.uid) ? (
          <HeartSolidIcon
            className="w-[22px] h-[22px] cursor-pointer
            text-pink-500 transition"
            onClick={() => likePost()}
          />
        ) : (
          <HeartIcon
            className="w-[22px] h-[22px] transition cursor-pointer hover:text-pink-500"
            onClick={() => likePost()}
          />
        )}
        <ChartBarIcon
          className="w-[22px] h-[22px]
            text-[#707389] cursor-not-allowed"
        />
        <ArrowUpTrayIcon
          className="w-[22px] h-[22px]
            text-[#707389] cursor-not-allowed"
        />
      </div>
      <LoadingScreen />
    </>
  );
}
