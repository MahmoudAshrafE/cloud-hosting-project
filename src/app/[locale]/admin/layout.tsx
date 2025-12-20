import AdminSidebar from "./AdminSidebar"


interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

const layout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className="flex min-h-[calc(100vh-140px)] bg-white dark:bg-slate-950 transition-colors">
      <aside className="w-20 lg:w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 p-4 lg:p-8 flex flex-col shadow-sm transition-colors sticky top-0 h-[calc(100vh-140px)]">
        <AdminSidebar />
      </aside>
      <main className="flex-1 overflow-y-auto p-4 lg:p-10">
        <div className="max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  )
}

export default layout