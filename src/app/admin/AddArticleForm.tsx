'use client'

import ButtonSpiner from "@/components/ButtonSpiner"
import { DOMAIN } from "@/utils/constants"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const AddArticleForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
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
            await axios.post(`${DOMAIN}/api/articles`, {title, description})
            setLoading(false)
            setTitle("")
            setDescription("")
            router.refresh()
            return toast.success("New Article Added ✔")
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
                placeholder="Enter Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
            className="mb-4 p-2 text-xl rounded resize-none bg-white"
            rows={5}
            placeholder="Enter Article Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button disabled={loading} type="submit" className="text-2xl text-white bg-blue-700 hover:bg-blue-900 rounded p-2 cursor-pointer">
                                {
                    loading ?
                    <div className="flex items-center justify-center">
                    <ButtonSpiner />
                    </div>
                        : "Add"
                }
            </button>
        </form>
    )
}

export default AddArticleForm