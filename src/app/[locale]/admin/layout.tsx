import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Toaster } from 'react-hot-toast'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <Toaster />
        {children}
      </main>
    </div>
  )
}
