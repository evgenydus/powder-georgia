'use client'

import { routes } from '@/constants'

import { AuthControls } from '@/components/auth'
import { LogoAnimated } from '@/components/ui/LogoAnimated'
import { DesktopNav } from './DesktopNav'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileNav } from './MobileNav'

import { Link } from '@/i18n/navigation'

export const Header = () => (
  <header className="sticky top-0 z-50 bg-gray-900 text-white">
    <div className="container mx-auto flex items-center justify-between p-4">
      <Link href={routes.home}>
        <LogoAnimated />
      </Link>

      <DesktopNav />

      <div className="flex items-center gap-3">
        <AuthControls />
        <LanguageSwitcher />
        <MobileNav />
      </div>
    </div>

    <div className="absolute -bottom-6 h-6 w-full bg-linear-to-b from-gray-900 to-transparent" />
  </header>
)
