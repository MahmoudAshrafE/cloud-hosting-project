'use client'

import { DOMAIN } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from 'next-intl';

export default function ButtonLogout() {
  const router = useRouter();
  const t = useTranslations('Navbar');

  const handleLogout = async () => {
    try {
      await axios.get(`/api/users/logout`)
      router.push("/");
      router.refresh()
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }


  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
    >
      {t('logout')}
    </button>
  );
}