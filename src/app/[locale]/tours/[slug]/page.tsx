import { getTranslations } from 'next-intl/server';
import { supabase } from '@/lib/supabase';
import type { Tour } from '@/types';
import Image from 'next/image';

async function getTourBySlug(slug: string): Promise<Tour | null> {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}

export default async function TourPage({ params }: { params: { slug: string; locale: string } }) {
  const { slug, locale } = params;
  const t = await getTranslations();
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return (
      <main className="min-h-screen bg-primary flex items-center justify-center">
        <h1 className="text-2xl text-white">{t('errors.notFound')}</h1>
      </main>
    );
  }

  const title = tour[`title_${locale as 'en' | 'ka' | 'ru'}`] || tour.title_en;
  const description = tour[`description_${locale as 'en' | 'ka' | 'ru'}`] || tour.description_en;
  const requiredEquipment = tour[`required_equipment_${locale as 'en' | 'ka' | 'ru'}`] || tour.required_equipment_en;

  return (
    <main className="min-h-screen bg-primary text-white">
      <div className="relative h-96 w-full">
        <Image
          src={tour.images[0]}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⛰️</span>
            <div>
              <p className="font-bold">{t('tours.difficulty')}</p>
              <p>{tour.difficulty}/5</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <div>
              <p className="font-bold">{t('tours.duration')}</p>
              <p>{tour.duration_hours}h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <div>
              <p className="font-bold">{t('tours.groupSize')}</p>
              <p>{tour.group_size_min}-{tour.group_size_max}</p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p>{description}</p>
        </div>

        {requiredEquipment && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{t('tours.requiredEquipment')}</h2>
            <p>{requiredEquipment}</p>
          </div>
        )}

        <div className="mt-8 text-right">
          <p className="text-3xl font-bold text-orange-400">${tour.price_usd}</p>
        </div>
      </div>
    </main>
  );
}
