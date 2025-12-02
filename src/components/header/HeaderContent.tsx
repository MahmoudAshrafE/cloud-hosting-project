'use client'
import React, { useState } from 'react'
import ProfileModal from './ProfileModal';
import { JWTPAYLOAD } from '@/utils/types';

interface HeaderContentProps{
    payload: JWTPAYLOAD
}

const HeaderContent = ({payload} : HeaderContentProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
                <>
              <strong onClick={() => setOpen(true)} className=" cursor-pointer text-blue-600 md:text-xl capitalize bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full">
                {payload.username[0]}
              </strong>
              <ProfileModal isOpen={open} onClose={() => setOpen(false)} user={{
                id: payload.id,
          username: payload.username,
          email: payload.email,
          isAdmin:payload.isAdmin
        }}/>
            </>
  )
}

export default HeaderContent