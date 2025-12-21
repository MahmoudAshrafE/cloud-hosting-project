import { verifyTokenBerPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ButtonLogout from "@/components/header/ButtonLogout";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccountButton from "./DeleteAccountButton";
import { getTranslations } from "next-intl/server";

const ProfilePage = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value || "";
    const payload = verifyTokenBerPage(token);

    if (!payload) {
        redirect("/login");
    }

    const t = await getTranslations('Profile');

    return (
        <section className="bg-white dark:bg-slate-950 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden transition-colors">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-xl bg-white dark:bg-slate-900 px-6 py-10 md:px-8 md:py-12 lg:p-14 rounded-3xl md:rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800 relative z-10">
                <div className="flex flex-col items-center mb-10 md:mb-12">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center text-4xl md:text-5xl font-black mb-6 shadow-2xl shadow-blue-500/20 md:rotate-3 md:hover:rotate-0 transition-transform duration-500">
                        {payload.username.charAt(0).toUpperCase()}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white capitalize mb-2 tracking-tighter text-center">
                        {payload.username}
                    </h1>

                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 italic font-medium bg-gray-100/50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-5 md:px-6 py-1.5 rounded-2xl shadow-sm text-center">
                        {payload.email}
                    </p>
                </div>

                <div className="space-y-8 md:space-y-12">
                    <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800/50 shadow-inner">
                        <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-6 md:mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-tight">
                            {t('change_password_title')}
                        </h3>
                        <ChangePasswordForm userId={payload.id} />
                    </div>

                    <div className="flex flex-col gap-6">
                        <ButtonLogout />
                        <DeleteAccountButton userId={payload.id} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
