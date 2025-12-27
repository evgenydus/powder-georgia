'use client'

import { useState } from 'react'
import Image from 'next/image'

import GalleryDialog from './GalleryDialog'

import { cn } from '@/lib/utils'

type ImageGalleryProps = {
  alt: string
  images: string[]
}

const ImageGallery = ({ alt, images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  const isOpen = selectedIndex !== null
  const currentImage = selectedIndex !== null ? images[selectedIndex] : null

  const goToPrevious = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
  }

  const goToNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={image}
            className={cn(
              'relative aspect-square overflow-hidden rounded-lg',
              'ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
              'transition-opacity hover:opacity-80',
            )}
            onClick={() => setSelectedIndex(index)}
            type="button"
          >
            <Image
              alt={`${alt} ${index + 1}`}
              className="object-cover"
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
              src={image}
            />
          </button>
        ))}
      </div>

      <GalleryDialog
        alt={alt}
        currentImage={currentImage}
        currentIndex={selectedIndex ?? 0}
        onClose={() => setSelectedIndex(null)}
        onNext={goToNext}
        onPrevious={goToPrevious}
        open={isOpen}
        totalImages={images.length}
      />
    </>
  )
}

export default ImageGallery
