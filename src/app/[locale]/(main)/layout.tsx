import { Footer, Header } from '@/components/layout'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <Header />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
)

export default MainLayout
