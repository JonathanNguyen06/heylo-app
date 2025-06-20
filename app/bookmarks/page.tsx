"use client";

import LoadingScreen from "@/components/LoadingScreen";
import CommentModal from "@/components/modals/CommentModal";
import Post from "@/components/Post";
import Postfeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { db } from "@/firebase";
import {
  closeLoadingScreen,
  openLoadingScreen,
} from "@/redux/slices/loadingSlice";
import { RootState } from "@/redux/store";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const [posts, setPosts] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);

  const user = useSelector((state: RootState) => state.user);
  const userBookmarks = user.bookmarks;

  console.log("Bookmarks:", user.bookmarks);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      dispatch(openLoadingScreen());

      try {
        if (!userBookmarks || userBookmarks.length === 0) {
          setPosts([]);
          dispatch(closeLoadingScreen());
          return;
        }

        // Fetch each bookmarked post by its ID
        const postPromises = userBookmarks.map((postId: string) =>
          getDoc(doc(db, "posts", postId))
        );

        const postSnapshots = await Promise.all(postPromises);

        // Filter out any missing/deleted documents
        const validDocs = postSnapshots.filter((snap) => snap.exists());

        // Map to fake QueryDocumentSnapshots to match your `Post` component expectations
        const wrappedDocs = validDocs.map((snap) => ({
          id: snap.id,
          data: () => snap.data() as DocumentData,
        })) as QueryDocumentSnapshot<DocumentData, DocumentData>[];

        setPosts(wrappedDocs);
      } catch (err) {
        console.error("Failed to load bookmarks:", err);
      }

      dispatch(closeLoadingScreen());
    };

    fetchBookmarkedPosts();
  }, [user.uid]);

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
              border-gray-100
              "
          >
            Bookmarks
          </div>

          {posts.map((post) => (
            <Post key={post.id} data={post.data()} id={post.id} />
          ))}
        </div>
        <Widgets />
      </div>

      <CommentModal />
    </>
  );
}
