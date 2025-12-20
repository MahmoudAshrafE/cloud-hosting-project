import LoginForm from "./LoginForm"
import { getTranslations } from 'next-intl/server';

const LoginPage = async () => {
  const t = await getTranslations('Auth');
  return (
    <section className="fix-height container m-auto flex justify-center items-center px-4">
      <div className="m-auto bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 w-full max-w-2xl shadow-2xl border border-gray-100 dark:border-slate-800 transition-colors">
        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-8 text-center tracking-tight">{t('login_title')}</h1>
        <LoginForm />
      </div>
    </section>
  )
}

export default LoginPage