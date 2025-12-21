'use client'


import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import ButtonSpiner from "../ButtonSpiner"
import { useTranslations } from 'next-intl';

interface AddCommentProps {
    articleId: number,
}
const AddcommentForm = ({ articleId }: AddCommentProps) => {
    const t = useTranslations('Comments');
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (text === '') {
            return toast.error(t('write_something_error'))
        }

        try {
            setLoading(true)
            await axios.post(`/api/comments`, { text, articleId })
            setLoading(false)
            toast.success(t('comment_added_success'))
            router.refresh()
            setText("")
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
            setLoading(false);
        }
    }
    return (
        <form onSubmit={formSubmitHandler} className="mb-10 group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>
            <div className="relative flex flex-col md:flex-row gap-3 md:gap-4 bg-white dark:bg-slate-900/80 backdrop-blur-xl p-2 md:p-3 rounded-3xl md:rounded-[2.2rem] border border-gray-100 dark:border-slate-800 shadow-2xl">
                <input
                    type="text"
                    className="flex-1 rounded-2xl md:rounded-[1.8rem] text-base md:text-lg lg:text-xl p-4 md:p-5 w-full bg-gray-50 dark:bg-slate-800/50 text-gray-900 dark:text-white border border-transparent focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium"
                    placeholder={t('placeholder')}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl md:rounded-[1.8rem] text-base md:text-lg font-black transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-70 disabled:pointer-events-none uppercase tracking-widest md:min-w-[180px]"
                >
                    {
                        loading ?
                            <div className="flex items-center justify-center">
                                <ButtonSpiner />
                            </div>
                            : t('submit_btn')
                    }
                </button>
            </div>
        </form>
    )
}

export default AddcommentForm
