import { Skeleton } from '@/components/ui'

type CardSkeletonProps = {
  aspectRatio?: 'square' | 'video'
  showFooter?: boolean
}

const CardSkeleton = ({ aspectRatio = 'video', showFooter = true }: CardSkeletonProps) => (
  <div className="bg-card overflow-hidden rounded-lg">
    <Skeleton className={aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'} />
    <div className="p-4">
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-4 h-4 w-full" />
      {showFooter && (
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      )}
    </div>
  </div>
)

type PageLoadingProps = {
  cardCount?: number
  cardAspectRatio?: 'square' | 'video'
  showCardFooter?: boolean
}

export const PageLoading = ({
  cardAspectRatio = 'video',
  cardCount = 6,
  showCardFooter = true,
}: PageLoadingProps) => {
  return (
    <main className="bg-background min-h-screen">
      <section className="to-background from-card bg-linear-to-b px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <Skeleton className="mx-auto mb-4 h-10 w-48" />
          <Skeleton className="mx-auto h-5 w-72" />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: cardCount }).map((_, i) => (
              <CardSkeleton key={i} aspectRatio={cardAspectRatio} showFooter={showCardFooter} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
