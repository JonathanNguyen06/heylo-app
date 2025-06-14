import React from "react";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch } from "react-redux";
import SidebarUserInfo from "./SidebarUserInfo";

export default function Sidebar() {
  return (
    <nav
      className="hidden sm:flex flex-col sticky top-0 h-screen
    p-3 xl:ml-20 xl:mr-10"
    >
      <div className="relative h-full flex flex-col items-center">
        <div className="py-3">
          <Image
            src="/assets/heylo-icon.png"
            width={42}
            height={42}
            alt="Heylo Logo"
          />
        </div>
        <ul>
          <SidebarLink Icon={HomeIcon} text="Home"></SidebarLink>
          <SidebarLink Icon={HashtagIcon} text="Explore"></SidebarLink>
          <SidebarLink Icon={BellIcon} text="Notifications"></SidebarLink>
          <SidebarLink Icon={InboxIcon} text="Messages"></SidebarLink>
          <SidebarLink Icon={BookmarkIcon} text="Bookmarks"></SidebarLink>
          <SidebarLink Icon={UserIcon} text="Profile"></SidebarLink>
          <SidebarLink
            Icon={EllipsisHorizontalCircleIcon}
            text="More"
          ></SidebarLink>
          <button
            className="hidden bg-[#f4af01] xl:block w-[200px] h-[52px]
          rounded-full text-white font-medium cursor-pointer
          shadow-md mt-2
          "
          >
            Say Heylo
          </button>
        </ul>

        <SidebarUserInfo />
      </div>
    </nav>
  );
}

interface SidebarLinkProps {
  text: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

function SidebarLink({ text, Icon }: SidebarLinkProps) {
  return (
    <li
      className="flex items-center text-xl mb-2 space-x-3
    p-2.5"
    >
      <Icon className="h-7" />
      <span className=" hidden xl:block">{text}</span>
    </li>
  );
}
