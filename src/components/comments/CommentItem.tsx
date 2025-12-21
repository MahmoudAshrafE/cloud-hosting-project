"use client"

import { CommentWithUser } from "@/utils/types"
import { FaEdit, FaTrash } from "react-icons/fa"
import UpdateCommentModal from "./UpdateCommentModal"
import { useState } from "react"
import { toast } from "react-toastify"
import axios, { AxiosError } from "axios"

import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl';

import ConfirmationModal from "@/components/ConfirmationModal"

interface CommentItemProps {
  comment: CommentWithUser,
  userId: number | undefined
}
const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const t = useTranslations('Comments');
  const tAdmin = useTranslations('Admin');
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const commentDeleteHandller = async () => {
    setIsDeleting(true)
    try {
      await axios.delete(`/api/comments/${comment.id}`);
      router.refresh();
      toast.success(t('delete_success'));
      setShowConfirm(false)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsDeleting(false)
    }
  };

  return (
    <div className="mb-5 rounded-3xl md:rounded-[2rem] p-6 md:p-8 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
        <strong className="text-gray-900 dark:text-white uppercase font-black tracking-tight text-base md:text-lg">
          {comment?.user?.username}
        </strong>
        <span className="w-fit bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-4 py-1 rounded-full text-[10px] md:text-xs font-bold border border-gray-100 dark:border-slate-700 shadow-sm">
          {new Date(comment?.createdAt).toDateString()}
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-wrap leading-relaxed text-base md:text-lg font-medium relative z-10 italic">
        {comment?.text}
      </p>

      {
        userId && (userId === comment.userId) &&
        <div className="flex justify-end items-center pt-6 border-t border-gray-100 dark:border-slate-800 relative z-10">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-bold me-6 hover:scale-105 transition-transform uppercase text-xs tracking-widest"
          >
            <FaEdit className="text-lg" />
            {tAdmin('edit_btn')}
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 text-rose-600 dark:text-rose-500 font-bold hover:scale-105 transition-transform uppercase text-xs tracking-widest"
          >
            <FaTrash className="text-lg" />
            {tAdmin('delete_btn')}
          </button>
        </div>
      }

      {
        open && <UpdateCommentModal setOpen={setOpen} text={comment.text} commentId={comment.id} />
      }

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={commentDeleteHandller}
        title={t('delete_confirm')}
        message={t('delete_confirm')}
        isLoading={isDeleting}
        confirmText={tAdmin('delete_btn')}
      />
    </div>
  )
}

export default CommentItem