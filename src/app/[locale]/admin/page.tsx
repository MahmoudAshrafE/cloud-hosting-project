import AddArticleForm from "./AddArticleForm"
import { protectAdmin } from "@/utils/protectAdmin";
import { getTranslations } from 'next-intl/server';
import { FaBookOpen, FaCommentDots, FaUserShield } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import prisma from "@/utils/db";
import { getArticlesCount } from "@/utils/data-access/articles";

const AdminPage = async () => {
  await protectAdmin()
  const t = await getTranslations('Admin');

  const articlesCount = await getArticlesCount();
  const commentsCount = await prisma.comment.count();
  const usersCount = await prisma.user.count();

  const stats = [
    { label: t('total_articles'), value: articlesCount.toString(), icon: <FaBookOpen />, color: 'bg-blue-500' },
    { label: t('total_comments'), value: commentsCount.toString(), icon: <FaCommentDots />, color: 'bg-emerald-500' },
    { label: t('total_users'), value: usersCount.toString(), icon: <FiUsers />, color: 'bg-orange-500' },
    { label: t('admin_status'), value: t('active_status'), icon: <FaUserShield />, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-6 group hover:shadow-2xl transition-all duration-500">
            <div className={`${stat.color} p-4 rounded-2xl text-white text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-400/5 blur-[100px] rounded-full"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10 text-center tracking-tight">
            ✨ {t('add_new_article')}
          </h2>
          <AddArticleForm />
        </div>
      </div>
    </div>
  )
}

export default AdminPage