import LoadingScreen from "@/components/LoadingScreen";
import CommentModal from "@/components/modals/CommentModal";
import Postfeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import React from "react";

export default function page() {
  return (
    <>
      <div
        className="text-[#0f1419] min-h-screen border-2
      max-w-[1400px] mx-auto flex justify-center"
      >
        <Sidebar />
        <Postfeed />
        <Widgets />
      </div>

      <CommentModal />
      <LoadingScreen />
    </>
  );
}
