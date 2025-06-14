import React from "react";
import Image from "next/image";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function Post() {
  return (
    <div>
      <PostHeader />
      <div className="ml-16 p-3 flex space-x-14">
        <div className="relative">
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-[22px] h-[22px] transition
            cursor-pointer hover:text-[#f4af01]"
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

export function PostHeader() {
  return (
    <div className="flex p-3 space-x-5">
      <Image
        src={"/assets/guest-profile.png"}
        width={44}
        height={44}
        alt="Profile Picture"
        className="w-11 h-11"
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
            Guest
          </span>
          <span
            className="whitespace-nowrap overflow-hidden text-ellipsis
            inline-block max-w-[60px] min-[400px]:max-w-[100px] 
            min-[500px]:max-w-[140px] sm:max-w-[160px]"
          >
            @guest12345
          </span>
          <span>·</span>
          <span>a day ago</span>
        </div>

        <span>asdfasdfasdfasdf</span>
      </div>
    </div>
  );
}
