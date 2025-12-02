'use client'

import { DOMAIN } from "@/utils/constants"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import ButtonSpiner from "../ButtonSpiner"
interface AddCommentProps {
    articleId: number,
}
const AddcommentForm = ({articleId} :AddCommentProps ) => {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const formSubmitHandler = async(e: React.FormEvent) => {
        e.preventDefault();

        if (text === '') {
            return toast.error('Please write something')
        }

        try {
            setLoading(true)
            await axios.post(`${DOMAIN}/api/comments`, {text, articleId})
            setLoading(false)
            router.refresh()
            setText("")
} catch (err) {
    const error = err as AxiosError<{ message: string }>;
    toast.error(error.response?.data?.message || "Something went wrong");
    setLoading(false);
}
    }
    return (
        <form onSubmit={formSubmitHandler} >
            <input
                type="text"
                className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md"
                placeholder="Add a comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button disabled={loading} type="submit" className=" bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition">
                                {
                    loading ?
                    <div className="flex items-center justify-center">
                    <ButtonSpiner />
                    </div>
                        : "comment"
                }
            </button>
        </form>
    )
}

export default AddcommentForm
