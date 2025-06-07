import React from "react";
import Image from "next/image";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function PostInput() {
  return (
    <div className="flex space-x-5 p-3">
      <Image
        src={"/assets/heylo-icon.png"}
        width={38}
        height={38}
        alt={"Logo"}
        className="w-[38px] h-[38px]"
      />

      <div className="w-full">
        <textarea
          className="resize-none 
        outline-none w-full min-h-[50px] text-lg
        "
          placeholder="What's happening?"
        />
        <div className="flex justify-between pt-5">
          <div className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-[#f4af01]" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#f4af01]" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#f4af01]" />
            <CalendarIcon className="w-[22px] h-[22px] text-[#f4af01]" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#f4af01]" />
          </div>
          <button
            className="bg-[#f4af01] text-white w-[80px] h-[36px]
          rounded-full text-sm cursor-pointer
          "
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
