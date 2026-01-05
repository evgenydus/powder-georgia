'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { navLinks } from './constants'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export const MobileNav = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Drawer direction="top" onOpenChange={setOpen} open={open}>
      <DrawerTrigger aria-label={t('navigation.menu')} className="p-2 md:hidden">
        <Menu className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="bg-background text-foreground">
        <DrawerTitle className="sr-only">{t('navigation.menu')}</DrawerTitle>
        <nav className="flex flex-col gap-2 px-4 pt-4 pb-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

            return (
              <DrawerClose key={link.href} asChild>
                <Link
                  className={cn(
                    'rounded-lg px-4 py-3 text-center text-lg transition-colors',
                    isActive && 'bg-card text-accent',
                  )}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              </DrawerClose>
            )
          })}
        </nav>
        <DrawerClose className="bg-muted mx-auto mb-4 h-1.5 w-12 rounded-full" />
      </DrawerContent>
    </Drawer>
  )
}
