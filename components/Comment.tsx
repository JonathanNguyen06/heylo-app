"use client";

interface CommentProps {
  id: string;
  data: DocumentData;
}

import React, { useEffect } from "react";
import { PostHeader } from "./Post";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { openLogInModal } from "@/redux/slices/modalSlice";
import { DocumentData } from "firebase/firestore";

export default function Comment({ id, data }: CommentProps) {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  //     if (postData?.likes.includes(user.uid)) {
  //       await updateDoc(postRef, {
  //         likes: arrayRemove(user.uid),
  //       });
  //     } else {
  //       await updateDoc(postRef, {
  //         likes: arrayUnion(user.uid),
  //       });
  //     }
  //   };

  console.log("rendering comment: " + data.text);
  return (
    <div className="border-b border-gray-100">
      <PostHeader name={data.name} username={data.username} text={data.text} />
      <div className="flex space-x-14 p-3 mx-16 items-center">
        <ChatBubbleOvalLeftEllipsisIcon
          className="w-[22px] h-[22px]
            cursor-not-allowed"
        />
        <div className="relative flex items-center space-x-1">
          <HeartIcon
            className="w-[22px] h-[22px]
            cursor-not-allowed"
          />
          <span>{data.likes?.length}</span>
        </div>
        <ChartBarIcon
          className="w-[22px] h-[22px]
            cursor-not-allowed"
        />
        <ArrowUpTrayIcon
          className="w-[22px] h-[22px]
            cursor-not-allowed"
        />
      </div>
    </div>
  );
}
