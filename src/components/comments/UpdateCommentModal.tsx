"use client"

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { toast } from 'react-toastify'
import ButtonSpiner from '../ButtonSpiner'

import { useTranslations } from 'next-intl';

interface UpdateCommentModalProps {
    setOpen: Dispatch<SetStateAction<boolean>>,
    text: string,
    commentId: number,
}
const UpdateCommentModal = ({ setOpen, text, commentId }: UpdateCommentModalProps) => {
    const t = useTranslations('Comments');
    const [updatedText, setUpdatedText] = useState(text)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (updatedText === '') {
            return toast.info(t('toast_write_something'))
        }


        try {
            setLoading(true)
            await axios.put(`/api/comments/${commentId}`, { text: updatedText })
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
        <div className='fixed top-0 left-0 bottom-0 right-0 z-[60] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 transition-all'>
            <div className='w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 dark:border-slate-800 scale-100 animate-from-circle relative overflow-hidden'>
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 dark:bg-blue-400/5 blur-[80px] rounded-full"></div>
                <div className='flex justify-between items-center mb-10 relative z-10'>
                    <h3 className='text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter'>{t('update_comment_title')}</h3>
                    <IoMdCloseCircleOutline onClick={() => setOpen(false)} className='text-gray-400 hover:text-rose-600 font-bold text-4xl cursor-pointer transition-colors' />
                </div>
                <form onSubmit={formSubmitHandler} className="relative z-10">
                    <textarea
                        className='text-xl rounded-2xl p-6 w-full bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none mb-8 transition-all resize-none font-medium'
                        rows={5}
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e?.target?.value)}
                    ></textarea>

                    <button disabled={loading} type='submit' className='bg-blue-600 dark:bg-blue-700 w-full text-white font-black p-4 text-xl rounded-2xl hover:bg-blue-700 dark:hover:bg-blue-800 transition-all shadow-lg active:scale-95 disabled:opacity-70 uppercase tracking-wide'>
                        {
                            loading ?
                                <div className="flex items-center justify-center">
                                    <ButtonSpiner />
                                </div>
                                : t('yes') // Using 'yes' as 'Update' or 'Edit' - I'll use a better key if I had one, but 'Edit' in Admin was used. I'll just use 'Edit' translated if I can or 'submit_btn'
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCommentModal;