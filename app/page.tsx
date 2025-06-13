import Postfeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import SignupPrompt from "@/components/SignupPrompt";
import Widgets from "@/components/Widgets";
import Image from "next/image";

export default function Home() {
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
      <SignupPrompt />
    </>
  );
}
