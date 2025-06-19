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
import {
  getDoc,
  doc,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openLogInModal } from "@/redux/slices/modalSlice";
import ClickedPost from "@/components/ClickedPost";
import LoadingScreen from "@/components/LoadingScreen";

const fetchPost = async (id: string) => {
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);
  return postSnap.data();
};

interface PageProps {
  params: {
    id: string;
  };
}

interface Comment {
  name: string;
  username: string;
  text: string;
}

export default async function page({ params }: PageProps) {
  const { id } = params;
  const post = await fetchPost(id);

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

          <ClickedPost post={post} id={id} />
          {post?.comments.map((comment: Comment) => (
            <Comment
              name={comment.name}
              username={comment.username}
              text={comment.text}
            />
          ))}
        </div>
        <Widgets />
      </div>

      <SignupPrompt />
    </>
  );
}

function Comment({ name, username, text }: Comment) {
  return (
    <div className="border-b border-gray-100">
      <PostHeader name={name} username={username} text={text} />
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
