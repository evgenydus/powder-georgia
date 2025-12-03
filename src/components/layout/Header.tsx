'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('navigation');

  const navLinks = [
    { href: '/tours', label: t('tours') },
    { href: '/transfers', label: t('transfers') },
    { href: '/instructors', label: t('instructors') },
    { href: '/apartments', label: t('apartments') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <span className="text-2xl font-bold text-white">Powder Georgia</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="transition-colors hover:text-orange-400">{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
