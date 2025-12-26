'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
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
import { MediaGrid } from './MediaGrid'

import type { MediaEntityType } from '@/types'

const entityTypeTabs: (MediaEntityType | 'all')[] = [
  'all',
  'tour',
  'apartment',
  'transfer',
  'instructor',
]

type MediaPickerProps = {
  alreadySelected: string[]
  currentEntityType: MediaEntityType
  onOpenChange: (open: boolean) => void
  onSelect: (urls: string[]) => void
  open: boolean
}

const MediaPicker = ({
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
    if (open) {
      refresh()
    }
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
        <div className="flex gap-1 border-b pb-2">
          {entityTypeTabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              size="sm"
              type="button"
              variant={activeTab === tab ? 'default' : 'ghost'}
            >
              {t(`admin.media.tabs.${tab}`)}
            </Button>
          ))}
        </div>
        <div className="max-h-[45vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="text-muted-foreground size-8 animate-spin" />
            </div>
          ) : media.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center">{t('admin.media.empty')}</p>
          ) : (
            <MediaGrid
              alreadySelected={alreadySelected}
              media={media}
              onToggle={toggleSelect}
              selected={selected}
            />
          )}
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

export { MediaPicker }
