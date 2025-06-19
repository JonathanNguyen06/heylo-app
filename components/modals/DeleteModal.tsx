"use client";

import { db } from "@/firebase";
import { closeDeleteModal, openDeleteModal } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface DeleteModalProps {
  id: string;
}

export default function DeleteModal({ id }: DeleteModalProps) {
  const router = useRouter();
  const isOpen = useSelector(
    (state: RootState) => state.modals.deleteModalOpen
  );

  async function deletePost() {
    await deleteDoc(doc(db, "posts", id));
  }

  const dispatch = useDispatch();

  return (
    <>
      <div
        className="w-full text-center py-2 hover:bg-gray-100 cursor-pointer text-red-400 flex items-center justify-center"
        onClick={() => dispatch(openDeleteModal())}
      >
        <TrashIcon className="hidden md:w-[30px] md:h-[14px] md:flex mr-0.5" />
        <span className="md:mr-3 px-2 md:px-0">Delete</span>
      </div>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeDeleteModal())}
        className="flex justify-center items-center"
      >
        <div
          className="w-full h-full sm:w-[500px] sm:h-fit bg-white
          sm:rounded-xl outline-none p-6 relative"
        >
          <XMarkIcon
            className="w-6 absolute top-4 right-4 cursor-pointer"
            onClick={() => dispatch(closeDeleteModal())}
          />
          <h2 className="text-2xl font-bold mb-4 text-center">Are you sure?</h2>
          <p className="text-sm text-gray-600 text-center mb-8">
            This action cannot be undone.
          </p>
          <div className="flex justify-between space-x-4">
            <button
              className="w-full py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
              onClick={() => dispatch(closeDeleteModal())}
            >
              Cancel
            </button>
            <button
              className="w-full py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold"
              onClick={() => {
                deletePost();
                router.push("/");
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
