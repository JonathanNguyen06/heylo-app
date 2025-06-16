"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { DocumentData, Timestamp } from "firebase/firestore";
import Moment from "react-moment";
import { openCommentModal, setCommentDetails } from "@/redux/slices/modalSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

interface PostProps {
  data: DocumentData;
  id: string;
}

export default function Post({ data, id }: PostProps) {
  const dispatch = useDispatch();

  return (
    <div className="border-b border-gray-200">
      <Link href={"/" + id}>
        <PostHeader
          username={data.username}
          name={data.name}
          timestamp={data.timestamp}
          text={data.text}
        />
      </Link>
      <div className="ml-16 p-3 flex space-x-14">
        <div className="relative">
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-[22px] h-[22px] transition
            cursor-pointer hover:text-[#f4af01]"
            onClick={() => {
              dispatch(
                setCommentDetails({
                  name: data.name,
                  username: data.username,
                  id: id,
                  text: data.text,
                })
              );
              dispatch(openCommentModal());
            }}
          />
          <span className="absolute text-xs top-1 -right-3">2</span>
        </div>
        <div className="relative">
          <HeartIcon
            className="w-[22px] h-[22px] transition
            cursor-pointer hover:text-[#f4af01]"
          />
          <span className="absolute text-xs top-1 -right-3">2</span>
        </div>
        <div className="relative">
          <ChartBarIcon
            className="w-[22px] h-[22px] transition cursor-not-allowed
            "
          />
        </div>
        <div className="relative">
          <ArrowUpTrayIcon
            className="w-[22px] h-[22px] transition cursor-not-allowed
            "
          />
        </div>
      </div>
    </div>
  );
}

interface PostHeaderProps {
  username: string;
  name: string;
  timestamp?: Timestamp;
  text: string;
  replyTo?: string;
}

export function PostHeader({
  username,
  name,
  timestamp,
  text,
  replyTo,
}: PostHeaderProps) {
  return (
    <div className="flex p-3 space-x-5">
      <Image
        src={"/assets/guest-profile.png"}
        width={44}
        height={44}
        alt="Profile Picture"
        className="w-11 h-11 z-10 bg-white"
      />
      <div className="text-[15px] flex flex-col space-y-1.5">
        <div className="flex space-x-1.5 text-[#707e89]">
          <span
            className="font-bold text-[#0f1419] whitespace-nowrap
            overflow-hidden text-ellipsis inline-block max-w-[60px]
            min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
            sm:max-w-[160px]
          "
          >
            {name}
          </span>
          <span
            className="whitespace-nowrap overflow-hidden text-ellipsis
            inline-block max-w-[60px] min-[400px]:max-w-[100px] 
            min-[500px]:max-w-[140px] sm:max-w-[160px]"
          >
            {username}
          </span>
          {timestamp && (
            <>
              <span>·</span>
              <Moment fromNow>{timestamp.toDate()}</Moment>
            </>
          )}
        </div>

        <span>{text}</span>
        {replyTo && (
          <span className="text-[15px] text-[#707e89]">
            Replying to <span className="text-[#f4af01]">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}
