import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminGuard } from '@/components/auth'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminGuard>
      <div className="bg-background text-foreground flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </AdminGuard>
  )
}

export default AdminLayout
