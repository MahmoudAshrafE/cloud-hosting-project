import React from "react";
import ButtonLogout from "./ButtonLogout";
import { JWTPAYLOAD } from "@/utils/types";
import { motion } from "framer-motion";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: JWTPAYLOAD;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white dark:bg-slate-900 w-80 md:w-96 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 p-6 absolute top-23 right-5"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-3xl font-bold border-2 border-blue-200 dark:border-blue-800">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-4 text-xl font-semibold capitalize text-gray-900 dark:text-white">
            {user.username}
          </h2>

          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>

        <div className="flex justify-center gap-4 mt-6">

          <ButtonLogout />
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;