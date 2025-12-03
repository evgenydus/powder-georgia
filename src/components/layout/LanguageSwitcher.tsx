'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const t = useTranslations('navigation');
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const newPath = `/${newLocale}${pathname.substring(3)}`;
    router.push(newPath);
  };

  return (
    <div className="relative">
      <select
        onChange={handleChange}
        defaultValue={pathname.substring(1, 3)}
        className="appearance-none rounded bg-gray-800 py-1 pl-2 pr-8 text-white focus:outline-none"
      >
        <option value="en">EN</option>
        <option value="ka">KA</option>
        <option value="ru">RU</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.516 7.548c.436-.446 1.143-.446 1.579 0L10 10.405l2.905-2.857c.436-.446 1.143-.446 1.579 0 .436.445.436 1.167 0 1.612l-3.694 3.63c-.436.446-1.143.446-1.579 0L5.516 9.16c-.436-.445-.436-1.167 0-1.612z" />
        </svg>
      </div>
    </div>
  );
}
