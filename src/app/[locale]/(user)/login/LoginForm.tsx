'use client'

import ButtonSpiner from "@/components/ButtonSpiner"
import { DOMAIN } from "@/utils/constants"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { Link } from "@/i18n/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { useTranslations } from 'next-intl';

const LoginForm = () => {

    const router = useRouter()
    const t = useTranslations('Auth');

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        if (email === '') {
            setLoading(false)
            return toast.error(t('email_required'))
        }
        if (password === '') {
            setLoading(false)
            return toast.error(t('password_required'))
        }

        try {
            setLoading(true)
            await axios.post(`${DOMAIN}/api/users/login`, { email, password })
            router.replace('/')
            setLoading(false)
            router.refresh()
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            // Using a fallback for error message or a generic one from translations if available
            toast.error(error.response?.data?.message || "Something went wrong");
            setLoading(false);
        }

    }
    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                type="email"
                className="mb-4 rounded-xl p-3 text-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder={t('email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="mb-4 rounded-xl p-3 text-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder={t('password_placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mb-6 text-right">
                <Link href="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    {t('forgot_password')}
                </Link>
            </div>
            <button disabled={loading} type="submit" className="text-2xl font-bold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-xl p-3 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none">
                {
                    loading ?
                        <div className="flex items-center justify-center">
                            <ButtonSpiner />
                        </div>
                        : t('login_btn')
                }
            </button>
        </form>
    )
}

export default LoginForm