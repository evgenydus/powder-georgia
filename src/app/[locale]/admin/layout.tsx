import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminGuard } from '@/components/auth'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-900 text-white">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </AdminGuard>
  )
}

export default AdminLayout
