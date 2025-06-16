import Postfeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import SignupPrompt from "@/components/SignupPrompt";
import Widgets from "@/components/Widgets";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { PostHeader } from "@/components/Post";

export default function page() {
  return (
    <>
      <div
        className="text-[#0f1419] min-h-screen border-2
      max-w-[1400px] mx-auto flex justify-center"
      >
        <Sidebar />

        <div
          className="flex-grow border max-w-2xl border-x border-gray-100
              "
        >
          <div
            className="py-4 px-3 text-lg sm:text-xl sticky top-0
                  z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b
                  border-gray-100 flex items-center
                  "
          >
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 mr-10" />
            </Link>
            Heylo
          </div>

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
                    Name
                  </span>
                  <span
                    className="text-[#707e89] whitespace-nowrap overflow-hidden 
                    text-ellipsis inline-block max-w-[60px] 
                    min-[400px]:max-w-[100px] 
                    min-[500px]:max-w-[140px] sm:max-w-[160px]"
                  >
                    Username
                  </span>
                </div>
              </div>
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </div>
            <span className="text-[15px]">Post Text</span>
          </div>
          <div className="border-b border-gray-100 p-3 text-[15px]">
            <span className="font-bold">0</span> likes
          </div>
          <div
            className="border-b border-gray-100 p-3 text-[15px]
          flex justify-evenly"
          >
            <ChatBubbleOvalLeftEllipsisIcon
              className="w-[22px] h-[22px]
            text-[#707389] cursor-not-allowed"
            />
            <HeartIcon
              className="w-[22px] h-[22px]
            text-[#707389] cursor-not-allowed"
            />
            <ChartBarIcon
              className="w-[22px] h-[22px]
            text-[#707389] cursor-not-allowed"
            />
            <ArrowUpTrayIcon
              className="w-[22px] h-[22px]
            text-[#707389] cursor-not-allowed"
            />
          </div>
          <Comment />
        </div>
      </div>
      <Widgets />

      <SignupPrompt />
    </>
  );
}

function Comment() {
  return (
    <div className="border-b border-gray-100">
      <PostHeader name="asdfasdf" username="asdfasdf123" text="kjdfkdjfk" />
      <div className="flex space-x-14 p-3 mx-16">
        <ChatBubbleOvalLeftEllipsisIcon
          className="w-[22px] h-[22px]
            cursor-not-allowed"
        />
        <HeartIcon
          className="w-[22px] h-[22px]
            cursor-not-allowed"
        />
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
