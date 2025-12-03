import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Apartment } from '@/types';

interface ApartmentCardProps {
  apartment: Apartment;
  locale: string;
}

export function ApartmentCard({ apartment, locale }: ApartmentCardProps) {
  const t = useTranslations();

  const title = apartment[`title_${locale as 'en' | 'ka' | 'ru'}`] || apartment.title_en;

  return (
    <Link href={`/${locale}/apartments/${apartment.slug}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 hover:scale-105">
        <div className="relative h-48 w-full overflow-hidden bg-gray-700">
          {apartment.images && apartment.images.length > 0 ? (
            <Image
              src={apartment.images[0]}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              {t('apartments.noImage')}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
          <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
            <span>👥</span>
            <span>{t('apartments.capacity')}: {apartment.capacity}</span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-700 pt-3">
            <span className="text-sm font-semibold text-orange-400">
              ${apartment.price_per_night_usd}/night
            </span>
            <span className="text-xs font-medium text-orange-400">
              {t('apartments.viewDetails')} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
