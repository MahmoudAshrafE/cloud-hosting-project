"use client"
import { DOMAIN } from '@/utils/constants'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

interface DeleteCommentButtonProps {
    commentId: number
}
const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
    const router = useRouter();

    const deleteCommentHandler = async () => {
        toast.warn(
            ({ closeToast }) => (
                <div>
                    <p className="text-white text-xl">Are you sure you want to delete this comment?</p>
                    <div className="flex gap-2 mt-2">
                            <button
                                className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                                onClick={async () => {
                                        closeToast();
                                    try {
                                        await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
                                        router.refresh();
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
    }

    return (
        <div onClick={deleteCommentHandler} className='bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-rose-800 transition'>
            Delete
        </div>
    )
}

export default DeleteCommentButton