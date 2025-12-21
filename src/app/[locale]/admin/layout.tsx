import AdminSidebar from "./AdminSidebar"
import MobileAdminSidebar from "./MobileAdminSidebar"

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className="flex min-h-[calc(100vh-140px)] bg-white dark:bg-slate-950 transition-colors relative">
      <MobileAdminSidebar />
      <aside className="hidden lg:flex w-72 bg-white dark:bg-slate-900 border-e border-gray-100 dark:border-slate-800 p-8 flex-col shadow-sm sticky top-0 h-[calc(100vh-140px)]">
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

export default AdminLayout