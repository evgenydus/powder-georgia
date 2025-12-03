import { ApartmentCard } from './ApartmentCard';
import type { Apartment } from '@/types';

interface ApartmentGridProps {
  apartments: Apartment[];
  locale: string;
}

export function ApartmentGrid({ apartments, locale }: ApartmentGridProps) {
  if (apartments.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">No apartments available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} locale={locale} />
      ))}
    </div>
  );
}
