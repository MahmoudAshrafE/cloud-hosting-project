import { Article } from "@/generated/prisma/client";
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import { IoCloudCircle } from 'react-icons/io5'

interface ArticleItemProps {
    article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
    const t = useTranslations('ArticlesPage');
    return (
        <div className="group p-8 rounded-[2.5rem] my-4 shadow-sm hover:shadow-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-700 w-full flex flex-col justify-between overflow-hidden relative" key={article.id}>
            {/* Hover decorative element - Dark mode only */}
            <div className="hidden dark:block absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 dark:bg-blue-400/5 blur-2xl rounded-full group-hover:bg-blue-500/10 transition-colors"></div>

            <div className="relative z-10 h-full flex flex-col">
                <div className="relative overflow-hidden rounded-2xl mb-8 group-hover:shadow-xl transition-all duration-500 bg-gray-50 dark:bg-slate-800 aspect-[16/10]">
                    {(article.image && (article.image.startsWith('/') || article.image.startsWith('http'))) ? (
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-slate-700">
                            <IoCloudCircle className="text-8xl" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="text-white font-black text-sm uppercase tracking-widest">{t('new_badge')}</span>
                    </div>
                </div>

                <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-3">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                            Technology
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                            {Math.max(1, Math.round(article.description.length / 100))} {t('reading_time')}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight uppercase">
                        {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-bold mb-8 line-clamp-3 leading-relaxed text-lg italic">
                        {article.description}
                    </p>
                </div>

                <div className="mt-auto border-t border-gray-50 dark:border-slate-800 pt-6">
                    <Link href={`/articles/${article.id}`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase text-sm tracking-widest hover:gap-4 transition-all">
                        {t('read_more')}
                        <span className="text-2xl">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ArticleItem