"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
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

interface ClickedPostPostProps {
  post: DocumentData | undefined;
  id: string;
}

export default function ClickedPost({ post, id }: ClickedPostPostProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [postData, setPostData] = useState<DocumentData | undefined>(undefined);

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
          <EllipsisHorizontalIcon className="w-5 h-5" />
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
