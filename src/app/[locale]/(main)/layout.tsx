import Image from 'next/image'

import { Footer, Header } from '@/components/layout'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="flex flex-col">
    <div className="fixed inset-x-0 top-20 -z-10 h-screen md:top-28">
      <Image
        alt=""
        className="object-cover object-top"
        fill
        priority
        quality={75}
        src="/images/mainBg.png"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>

    <Header />
    <main className="flex flex-1 flex-col">{children}</main>
    <Footer />
  </div>
)

export default MainLayout
