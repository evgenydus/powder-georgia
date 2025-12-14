import { Toaster } from 'react-hot-toast'

import { AdminSidebar } from '@/components/admin/AdminSidebar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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

export default AdminLayout
