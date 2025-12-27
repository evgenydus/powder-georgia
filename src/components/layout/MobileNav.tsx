'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { routes } from '@/constants'

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

  const navLinks = [
    { href: routes.tours, label: t('navigation.tours') },
    { href: routes.transfers, label: t('navigation.transfers') },
    { href: routes.instructors, label: t('navigation.instructors') },
    { href: routes.apartments, label: t('navigation.apartments') },
    { href: routes.about, label: t('navigation.about') },
    { href: routes.contact, label: t('navigation.contact') },
  ]

  return (
    <Drawer direction="top" onOpenChange={setOpen} open={open}>
      <DrawerTrigger aria-label={t('navigation.menu')} className="p-2 md:hidden">
        <Menu className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="bg-gray-900 text-white">
        <DrawerTitle className="sr-only">{t('navigation.menu')}</DrawerTitle>
        <nav className="flex flex-col gap-2 px-4 pb-4 pt-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

            return (
              <DrawerClose asChild key={link.href}>
                <Link
                  className={cn(
                    'rounded-lg px-4 py-3 text-center text-lg transition-colors',
                    isActive && 'bg-gray-800 text-orange-400',
                  )}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </DrawerClose>
            )
          })}
        </nav>
        <DrawerClose className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-600" />
      </DrawerContent>
    </Drawer>
  )
}
