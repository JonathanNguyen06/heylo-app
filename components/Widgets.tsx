import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";

export default function Widgets() {
  return (
    <div
      className="p-3 hidden lg:flex flex-col space-y-4 w-[400px]
    ps-10"
    >
      <div
        className="flex bg-[#dbe4e4] text-[#89959d] items-center
      space-x-3 rounded-full pl-5 h-[44px]"
      >
        <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search Heylo"
          className="bg-transparent outline-none"
        ></input>
      </div>

      <div className="bg-[#dbe4e4] rounded-xl p-3">
        <h1 className="font-xl font-bold mb-2">What's Happening</h1>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-[#536471] text-[13px]">
            <span>Trending in America</span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-xs">240K Shares</span>
        </div>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-[#536471] text-[13px]">
            <span>Trending in America</span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-xs">240K Shares</span>
        </div>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-[#536471] text-[13px]">
            <span>Trending in America</span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-xs">240K Shares</span>
        </div>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-[#536471] text-[13px]">
            <span>Trending in America</span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-xs">240K Shares</span>
        </div>
      </div>

      <div className="bg-[#dbe4e4] rounded-xl p-3">
        <h1 className="font-xl font-bold mb-2">Who to Follow</h1>

        <div className="justify-between flex items-center py-3">
          <div className="flex space-x-3 items-center">
            <Image
              src={"/assets/guest-profile.png"}
              width={56}
              height={56}
              alt="Profile Picture"
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col text-sm">
              <span className="font-bold">Jonathan Nguyen</span>
              <span>@jthans26</span>
            </div>
          </div>

          <button
            className="bg-[#0f1419] text-white w-[72px]
          h-[40px] rounded-full text-sm
          "
          >
            Follow
          </button>
        </div>

        <div className="justify-between flex items-center py-3">
          <div className="flex space-x-3 items-center">
            <Image
              src={"/assets/guest-profile.png"}
              width={56}
              height={56}
              alt="Profile Picture"
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col text-sm">
              <span className="font-bold">Jonathan Nguyen</span>
              <span>@jthans26</span>
            </div>
          </div>

          <button
            className="bg-[#0f1419] text-white w-[72px]
          h-[40px] rounded-full text-sm
          "
          >
            Follow
          </button>
        </div>

        <div className="justify-between flex items-center py-3">
          <div className="flex space-x-3 items-center">
            <Image
              src={"/assets/guest-profile.png"}
              width={56}
              height={56}
              alt="Profile Picture"
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col text-sm">
              <span className="font-bold">Jonathan Nguyen</span>
              <span>@jthans26</span>
            </div>
          </div>

          <button
            className="bg-[#0f1419] text-white w-[72px]
          h-[40px] rounded-full text-sm
          "
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
