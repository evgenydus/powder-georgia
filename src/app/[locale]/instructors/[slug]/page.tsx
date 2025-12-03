import { getTranslations } from 'next-intl/server';
import { supabase } from '@/lib/supabase';
import type { Instructor } from '@/types';
import Image from 'next/image';

async function getInstructorBySlug(slug: string): Promise<Instructor | null> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error fetching instructor:', error);
    return null;
  }
}

export default async function InstructorPage({ params }: { params: { slug: string; locale: string } }) {
  const { slug, locale } = params;
  const t = await getTranslations();
  const instructor = await getInstructorBySlug(slug);

  if (!instructor) {
    return (
      <main className="min-h-screen bg-primary flex items-center justify-center">
        <h1 className="text-2xl text-white">{t('errors.notFound')}</h1>
      </main>
    );
  }

  const specialization = instructor[`specialization_${locale as 'en' | 'ka' | 'ru'}`] || instructor.specialization_en;
  const bio = instructor[`bio_${locale as 'en' | 'ka' | 'ru'}`] || instructor.bio_en;
  const services = instructor[`services_${locale as 'en' | 'ka' | 'ru'}`] || instructor.services_en;

  return (
    <main className="min-h-screen bg-primary text-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative h-80 w-full rounded-lg overflow-hidden">
              <Image
                src={instructor.photo_url}
                alt={instructor.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{instructor.name}</h1>
            <p className="text-xl text-gray-400 mb-4">{specialization}</p>
            <div className="prose prose-invert max-w-none mb-8">
              <p>{bio}</p>
            </div>
            {services && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{t('instructors.services')}</h2>
                <p>{services}</p>
              </div>
            )}
            <div className="text-right">
              <p className="text-3xl font-bold text-orange-400">
                {instructor.price_per_hour_usd ? `$${instructor.price_per_hour_usd}/hr` : t('common.inquire')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
