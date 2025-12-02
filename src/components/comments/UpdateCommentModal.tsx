"use client"
import { DOMAIN } from '@/utils/constants'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { toast } from 'react-toastify'
import ButtonSpiner from '../ButtonSpiner'

interface UpdateCommentModalProps {
    setOpen: Dispatch<SetStateAction<boolean>>,
    text: string,
    commentId: number,
}
const UpdateCommentModal = ({setOpen, text, commentId}: UpdateCommentModalProps) => {
    const [ updatedText, setUpdatedText ] = useState(text)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
     const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (updatedText === '') {
            return toast.info('please write something')
        }
      

        try {
            setLoading(true)
            await axios.put(`${DOMAIN}/api/comments/${commentId}`, { text: updatedText })
            setLoading(false)
            router.refresh()
            setUpdatedText("")
            setOpen(false)
} catch (err) {
    const error = err as AxiosError<{ message: string }>;
    toast.error(error.response?.data?.message || "Something went wrong");
    setLoading(false);
}
    }
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 z-10 bg-black flex items-center justify-center'>
        <div className='w-11/12 lg:w-2/4 bg-gray-300 rounded-lg p-3'>
        <div className='flex justify-end items-start mb-2'>
            <IoMdCloseCircleOutline onClick={() => setOpen(false)} className=' text-rose-700 font-bold text-2xl cursor-pointer' />
        </div>
        <form onSubmit={formSubmitHandler}>
            <input
            type="text"
            className='text-xl rounded-lg p-2 w-full bg-white mb-2'
            value={updatedText}
            onChange={(e) => setUpdatedText(e?.target?.value)}
             />
             
             <button disabled={loading} type='submit' className='bg-green-700 w-full text-white mt-2 p-2 text-xl rounded-lg hover:bg-green-900 transtion'>
                                {
                    loading ?
                    <div className="flex items-center justify-center">
                    <ButtonSpiner />
                    </div>
                        : "Edit"
                }
             </button>
        </form>
        </div>
    </div>
  )
}

export default UpdateCommentModal;