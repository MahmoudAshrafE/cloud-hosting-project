"use client"

import { CommentWithUser } from "@/utils/types"
import { FaEdit, FaTrash } from "react-icons/fa"
import UpdateCommentModal from "./UpdateCommentModal"
import { useState } from "react"
import { toast } from "react-toastify"
import axios, { AxiosError } from "axios"
import { DOMAIN } from "@/utils/constants"
import { useRouter } from "next/navigation"
interface CommentItemProps{
    comment: CommentWithUser,
    userId : number | undefined
}
const CommentItem = ({comment, userId}: CommentItemProps) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const commentDeleteHandller = async () => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p className="text-white text-xl">Are you sure you want to delete this comment?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
              onClick={async () => {
                try {
                  await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
                  router.refresh();
                  closeToast();
                  toast.success("Comment deleted successfully!");
} catch (err) {
    const error = err as AxiosError<{ message: string }>;
    toast.error(error.response?.data?.message || "Something went wrong");

}
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded cursor-pointer"
              onClick={() => closeToast()}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };
    
  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
        <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-800 uppercase">
                {comment?.user?.username}
            </strong>
            <span className="bg-yellow-700 px-1 rounded-lg text-white">
                {new Date(comment?.createdAt).toDateString()}
            </span>
        </div>
        <p className="text-gray-800 mb-2">
            {comment?.text}
        </p>
        {
            userId && (userId === comment.userId)   &&      
            <div className="flex justify-end items-center">
            <FaEdit onClick={() => setOpen(true)} className="text-green-600 text-xl cursor-pointer me-3"/>
            <FaTrash onClick={commentDeleteHandller} className="text-red-600 text-xl cursor-pointer" />
        </div>
        }
        {
            open && <UpdateCommentModal setOpen={setOpen} text={comment.text} commentId={comment.id} />
        }
    </div>
  )
}

export default CommentItem