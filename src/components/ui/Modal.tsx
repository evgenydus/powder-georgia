'use client'

import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onOpen?: () => void
  children: React.ReactNode
  className?: string
  title?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  children,
  className,
  title,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      onOpen?.()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/80"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal Content */}
      <div
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg',
          className,
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}

        {/* Content */}
        {children}
      </div>
    </>
  )
}
