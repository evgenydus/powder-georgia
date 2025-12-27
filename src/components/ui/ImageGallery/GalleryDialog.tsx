'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'

type GalleryDialogProps = {
  alt: string
  currentImage: string | null
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  open: boolean
  totalImages: number
}

const GalleryDialog = ({
  alt,
  currentImage,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  open,
  totalImages,
}: GalleryDialogProps) => (
  <Dialog onOpenChange={(isOpen) => !isOpen && onClose()} open={open}>
    <DialogContent className="max-h-[90vh] max-w-[90vw] border-none bg-transparent p-0 shadow-none sm:max-w-4xl">
      <DialogTitle className="sr-only">{alt}</DialogTitle>

      {currentImage && (
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:aspect-4/3">
            <Image
              alt={`${alt} ${currentIndex + 1}`}
              className="object-contain"
              fill
              priority
              sizes="90vw"
              src={currentImage}
            />
          </div>

          {totalImages > 1 && (
            <>
              <button
                className="absolute left-2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 sm:left-4"
                onClick={onPrevious}
                type="button"
              >
                <ChevronLeft className="size-6" />
                <span className="sr-only">Previous</span>
              </button>

              <button
                className="absolute right-2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 sm:right-4"
                onClick={onNext}
                type="button"
              >
                <ChevronRight className="size-6" />
                <span className="sr-only">Next</span>
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {currentIndex + 1} / {totalImages}
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
)

export default GalleryDialog
