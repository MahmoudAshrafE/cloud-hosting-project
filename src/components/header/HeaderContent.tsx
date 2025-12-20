'use client'
import React from 'react'
import { JWTPAYLOAD } from '@/utils/types';
import Link from 'next/link';

interface HeaderContentProps {
  payload: JWTPAYLOAD
}

const HeaderContent = ({ payload }: HeaderContentProps) => {

  return (
    <div className="flex items-center">
      <Link
        href="/profile"
        className="cursor-pointer text-blue-700 dark:text-blue-100 md:text-xl font-bold capitalize bg-blue-100 dark:bg-blue-900 w-11 h-11 flex items-center justify-center rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-all shadow-sm ring-2 ring-transparent hover:ring-blue-400 dark:hover:ring-blue-600"
      >
        {payload.username[0]}
      </Link>
    </div>
  )
}

export default HeaderContent