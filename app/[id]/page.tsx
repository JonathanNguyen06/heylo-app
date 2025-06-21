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
import CommentModal from "@/components/modals/CommentModal";
import Comment from "@/components/Comment";
import CommentFeed from "@/components/CommentFeed";

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
          <CommentFeed postId={id} />
        </div>
        <Widgets />
      </div>

      <SignupPrompt />
      <CommentModal />
    </>
  );
}
