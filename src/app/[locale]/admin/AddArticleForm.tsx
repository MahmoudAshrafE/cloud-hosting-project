'use client'

import ButtonSpiner from "@/components/ButtonSpiner"

import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { useTranslations } from 'next-intl';

const AddArticleForm = () => {
    const t = useTranslations('Admin');
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (title === '') {
            return toast.error(t('title_required'))
        }
        if (description === '') {
            return toast.error(t('desc_required'))
        }

        try {
            setLoading(true)
            await axios.post(`/api/articles`, { title, description, image })
            setLoading(false)
            setTitle("")
            setDescription("")
            setImage("")
            router.refresh()
            return toast.success(t('article_added'))
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || t('error_occurred'));
            setLoading(false);
        }
    }
    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">{t('title')}</label>
                <input
                    type="text"
                    className="rounded-2xl p-4 text-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder={t('title_placeholder')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">{t('desc_placeholder')}</label>
                <textarea
                    className="p-4 text-lg rounded-2xl resize-none bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    rows={5}
                    placeholder={t('desc_placeholder')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            <div className="flex flex-col gap-2 mb-4">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">{t('image_placeholder')}</label>
                <input
                    type="text"
                    className="rounded-2xl p-4 text-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder={t('image_placeholder')}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>

            <button disabled={loading} type="submit" className="text-xl font-black text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-2xl p-4 cursor-pointer shadow-lg glow-hover transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none uppercase tracking-wide">
                {
                    loading ?
                        <div className="flex items-center justify-center">
                            <ButtonSpiner />
                        </div>
                        : t('create_btn')
                }
            </button>
        </form>
    )
}

export default AddArticleForm