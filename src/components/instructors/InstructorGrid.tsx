import { InstructorCard } from './InstructorCard';
import type { Instructor } from '@/types';

interface InstructorGridProps {
  instructors: Instructor[];
  locale: string;
}

export function InstructorGrid({ instructors, locale }: InstructorGridProps) {
  if (instructors.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">No instructors available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {instructors.map((instructor) => (
        <InstructorCard key={instructor.id} instructor={instructor} locale={locale} />
      ))}
    </div>
  );
}
