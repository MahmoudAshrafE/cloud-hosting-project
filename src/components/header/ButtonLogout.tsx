'use client'


import axios, { AxiosError } from "axios";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from 'next-intl';

export default function ButtonLogout() {
  const router = useRouter();
  const t = useTranslations('Navbar');

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get(`/api/users/logout`)
      toast.success("Logged out successfully");
      router.replace("/");
      router.refresh();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  // Helper to safely get translation with fallback to prevent crash in dev
  const getTranslation = (key: string, fallback: string) => {
    try {
      return t(key);
    } catch {
      return fallback;
    }
  };


  return (
    <button
      disabled={loading}
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
    >
      {loading ? getTranslation('loading', '...') : getTranslation('logout', 'Logout')}
    </button>
  );
}