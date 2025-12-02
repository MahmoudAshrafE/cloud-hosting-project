'use client'

import ButtonSpiner from "@/components/ButtonSpiner"
import { DOMAIN } from "@/utils/constants"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const RegisterForm = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [loading, setLoading] = useState(false)
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username === '') {
            return toast.error('Username is required')
        }
        if (email === '') {
            return toast.error('Email is required')
        }
        if (password === '') {
            return toast.error('Password is required')
        }

        try {
            setLoading(true)
            await axios.post(`${DOMAIN}/api/users/register`, { username, email, password })
            router.replace('/')
            setLoading(false)
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

                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="email"
                className="mb-4 rounded p-2 text-xl bg-white"

                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="mb-4 rounded p-2 text-xl bg-white"

                placeholder="Enter Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loading} type="submit" className="text-2xl text-white bg-blue-800 rounded p-2 cursor-pointer">
                {
                    loading ?
                        <div className="flex items-center justify-center">
                            <ButtonSpiner />
                        </div>
                        : "Register"
                }
            </button>
        </form>
    )
}

export default RegisterForm