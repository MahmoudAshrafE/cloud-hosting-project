'use client'
import { useState } from "react"
import { CgMenuGridR } from "react-icons/cg"
import { IoClose } from "react-icons/io5"
import { useLocale, useTranslations } from "next-intl"
import AdminSidebar from "./AdminSidebar"

const MobileAdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const t = useTranslations('Admin');
    const isRtl = locale === 'ar';

    return (
        <div className="lg:hidden">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 bg-blue-600 text-white ${isRtl ? 'pr-5 pl-6' : 'pl-5 pr-6'} py-4 rounded-2xl shadow-2xl shadow-blue-500/40 active:scale-95 transition-all flex items-center gap-3 group`}
            >
                <CgMenuGridR className="text-2xl md:text-3xl group-hover:rotate-90 transition-transform duration-500" />
                <span className="font-black uppercase tracking-widest text-[10px] md:text-xs">{t('dashboard')}</span>
            </button>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <aside className={`
                fixed top-0 ${isRtl ? 'right-0' : 'left-0'} z-[70] h-[100vh] w-72 bg-white dark:bg-slate-900 ${isRtl ? 'border-l' : 'border-r'} border-gray-100 dark:border-slate-800 p-8 flex flex-col shadow-2xl
                transition-all duration-500 ease-in-out
                ${isOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')}
            `}>
                <div className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'}`}>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-rose-600 transition-colors">
                        <IoClose className="text-3xl" />
                    </button>
                </div>
                <AdminSidebar onClose={() => setIsOpen(false)} />
            </aside>
        </div>
    );
};

export default MobileAdminSidebar;
