"use client";

import React, { useState } from "react";
import { Modal } from "@mui/material";

export default function SignupModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        className="w-full h-[40px] md:w-[88px] md:h-[40px] md:text-sm 
            font-bold bg-white rounded-full text-md"
        onClick={handleOpen}
      >
        Sign Up
      </button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <div className="w-[200px] h-[400px] bg-white"></div>
      </Modal>
    </>
  );
}
