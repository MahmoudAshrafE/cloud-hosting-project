'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { BsMoonStars, BsSun } from 'react-icons/bs'

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-800 animate-pulse"></div>
        )
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all border border-gray-200 dark:border-slate-700 shadow-sm active:scale-95 group"
            aria-label="Toggle Dark Mode"
        >
            {isDark ?
                <BsSun className="text-xl group-hover:rotate-90 transition-transform duration-300" /> :
                <BsMoonStars className="text-xl group-hover:-rotate-12 transition-transform duration-300" />
            }
        </button>
    )
}
