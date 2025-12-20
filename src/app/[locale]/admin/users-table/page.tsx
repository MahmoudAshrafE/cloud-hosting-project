import { getAllUsers } from "@/utils/data-access/users";
import { getTranslations } from "next-intl/server";
import DeleteUserButton from "./DeleteUserButton";
import { verifyTokenBerPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";

const AdminUsersTable = async () => {
    const users = await getAllUsers();
    const t = await getTranslations('Table');
    const tAdmin = await getTranslations('Admin');

    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value || "";
    const payload = verifyTokenBerPage(token);

    return (
        <section className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
                        {t('users_title')}
                    </h1>
                    <p className="text-slate-400 font-medium text-lg">
                        {tAdmin('user_management')}
                    </p>
                </div>
                <div className="bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800 shadow-xl">
                    <span className="text-slate-500 font-bold uppercase text-xs tracking-widest block mb-1">{t('users_title')}</span>
                    <span className="text-3xl font-black text-blue-500 tracking-tighter">{users.length}</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>

                <div className="overflow-x-auto relative z-10">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                                <th className="p-8 text-slate-500 dark:text-slate-400 font-black uppercase text-xs tracking-[0.2em]">{t('username')}</th>
                                <th className="p-8 text-slate-500 dark:text-slate-400 font-black uppercase text-xs tracking-[0.2em] hidden md:table-cell">{t('email')}</th>
                                <th className="p-8 text-slate-500 dark:text-slate-400 font-black uppercase text-xs tracking-[0.2em]">{t('role')}</th>
                                <th className="p-8 text-slate-500 dark:text-slate-400 font-black uppercase text-xs tracking-[0.2em] hidden lg:table-cell">{t('created_at')}</th>
                                <th className="p-8 text-slate-500 dark:text-slate-400 font-black uppercase text-xs tracking-[0.2em] text-center">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="p-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-900 dark:text-white font-black text-xl tracking-tight">
                                                    {user.username}
                                                </span>
                                                {payload?.id === user.id && (
                                                    <span className="text-[10px] bg-blue-600 text-white font-black px-2 py-0.5 rounded-md uppercase tracking-widest w-fit mt-1">
                                                        {tAdmin('active_status')} (YOU)
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8 hidden md:table-cell">
                                        <span className="text-gray-600 dark:text-slate-400 font-medium text-lg italic">
                                            {user.email}
                                        </span>
                                    </td>
                                    <td className="p-8">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${user.isAdmin ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>
                                            {user.isAdmin ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                    <td className="p-8 hidden lg:table-cell">
                                        <span className="text-gray-500 dark:text-slate-500 font-bold text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="p-8 text-center">
                                        {payload?.id !== user.id && (
                                            <DeleteUserButton userId={user.id} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default AdminUsersTable;
