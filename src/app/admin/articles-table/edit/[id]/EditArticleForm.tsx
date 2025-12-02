'use client'
import ButtonSpiner from '@/components/ButtonSpiner'
import { Article } from '@/generated/prisma/client'
import { DOMAIN } from '@/utils/constants'
import axios, { AxiosError } from 'axios'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface EditArticleFormProps{
    article: Article
}
const EditArticleForm = ({article}: EditArticleFormProps) => {
    const [title, setTitle] = useState(article.title)
    const [description, setDescription] = useState(article.description)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const formSubmitHandler = async(e: React.FormEvent) => {
        e.preventDefault();

        if (title === '') {
            return toast.error('Title is required')
        }
        if (description === '') {
            return toast.error('Description is required')
        }

        try {
            setLoading(true)
            await axios.put(`${DOMAIN}/api/articles/${article.id}`, {title, description})
            router.push('/admin/articles-table?pageNumber=1')
             toast.success("Article Updated ✔")
            router.refresh()
            
} catch (err) {
    const error = err as AxiosError<{ message: string }>;
    toast.error(error.response?.data?.message || "Something went wrong");
    setLoading(false);
}
    }
    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                type="text"
                className="mb-4 rounded p-2 text-xl bg-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
            className="mb-4 p-2 text-xl rounded resize-none bg-white"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button disabled={loading} type="submit" className="text-2xl text-white bg-blue-700 hover:bg-blue-900 rounded p-2 cursor-pointer">
                                {
                    loading ?
                    <div className="flex items-center justify-center">
                    <ButtonSpiner />
                    </div>
                        : "Edit"
                }
            </button>
        </form>
    )
}

export default EditArticleForm