'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useMediaLibrary } from '@/hooks/useMediaLibrary'

import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { EntityTabs } from './EntityTabs'
import { MediaContent } from './MediaContent'

import type { MediaEntityType } from '@/types'

type MediaPickerProps = {
  alreadySelected: string[]
  currentEntityType: MediaEntityType
  onOpenChange: (open: boolean) => void
  onSelect: (urls: string[]) => void
  open: boolean
}

export const MediaPicker = ({
  alreadySelected,
  currentEntityType,
  onOpenChange,
  onSelect,
  open,
}: MediaPickerProps) => {
  const t = useTranslations()
  const [activeTab, setActiveTab] = useState<MediaEntityType | 'all'>(currentEntityType)
  const [selected, setSelected] = useState<string[]>([])

  const filter = activeTab === 'all' ? null : activeTab
  const { isLoading, media, refresh } = useMediaLibrary(filter)

  useEffect(() => {
    if (open) refresh()
  }, [open, refresh])

  const toggleSelect = (url: string) => {
    if (alreadySelected.includes(url)) return
    setSelected((prev) => (prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]))
  }

  const handleConfirm = () => {
    onSelect(selected)
    setSelected([])
    onOpenChange(false)
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t('admin.media.selectImages')}</DialogTitle>
        </DialogHeader>
        <EntityTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="max-h-[45vh] overflow-y-auto">
          <MediaContent
            alreadySelected={alreadySelected}
            isLoading={isLoading}
            media={media}
            onToggle={toggleSelect}
            selected={selected}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
            {t('admin.media.cancel')}
          </Button>
          <Button disabled={selected.length === 0} onClick={handleConfirm} type="button">
            {t('admin.media.addSelected', { count: selected.length })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
