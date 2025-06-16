"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeCommentModal } from "@/redux/slices/modalSlice";

interface PostInputProps {
  insideModal?: boolean;
}

export default function PostInput({ insideModal }: PostInputProps) {
  const [text, setText] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const commentDetails = useSelector(
    (state: RootState) => state.modals.commentPostDetails
  );
  const dispatch = useDispatch();

  async function sendPost() {
    await addDoc(collection(db, "posts"), {
      text: text,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });

    setText("");
  }

  async function sendComment() {
    const postRef = doc(db, "posts", commentDetails.id);

    await updateDoc(postRef, {
      comments: arrayUnion({
        name: user.name,
        username: user.username,
        text: text,
      }),
    });

    setText("");
    dispatch(closeCommentModal());
  }

  return (
    <div className="flex space-x-5 p-3 border-b border-gray-200">
      <Image
        src={
          insideModal ? "/assets/guest-profile.png" : "/assets/heylo-icon.png"
        }
        width={44}
        height={44}
        alt={insideModal ? "Profile Picture" : "Logo"}
        className="w-[44px] h-[44px] z-10 bg-white"
      />

      <div className="w-full">
        <textarea
          className="resize-none 
        outline-none w-full min-h-[50px] text-lg
        "
          placeholder={insideModal ? "Send your reply" : "What's happening?"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-between pt-5 border-t border-gray-100">
          <div className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-[#f4af01]" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#f4af01]" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#f4af01]" />
            <CalendarIcon className="w-[22px] h-[22px] text-[#f4af01]" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#f4af01]" />
          </div>
          <button
            className="bg-[#f4af01] text-white w-[80px] h-[36px]
          rounded-full text-sm cursor-pointer disabled:bg-opacity-60
          "
            onClick={() => (insideModal ? sendComment() : sendPost())}
            disabled={!text}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
