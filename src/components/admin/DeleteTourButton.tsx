
'use client';

import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export function DeleteTourButton({ tourId }: { tourId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this tour?')) {
      const { error } = await supabase.from('tours').delete().eq('id', tourId);

      if (error) {
        console.error('Supabase error:', error);
        // TODO: show error to user
      } else {
        router.refresh();
      }
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
  );
}
