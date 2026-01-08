'use client'

import { useState } from 'react'
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
import { Skeleton } from '@/components/ui/Skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { MediaItem } from './MediaItem'
import type { MediaLibraryDialogProps } from './types'

import type { MediaEntityType } from '@/types'

const TABS: Array<{ label: string; value: MediaEntityType | 'all' }> = [
  { label: 'admin.media.tabs.all', value: 'all' },
  { label: 'admin.media.tabs.tour', value: 'tour' },
  { label: 'admin.media.tabs.apartment', value: 'apartment' },
  { label: 'admin.media.tabs.transfer', value: 'transfer' },
  { label: 'admin.media.tabs.instructor', value: 'instructor' },
]

const MediaLibraryDialog = ({
  entityType,
  maxSelectable,
  onOpenChange,
  onSelect,
  open,
  selectedIds,
}: MediaLibraryDialogProps) => {
  const t = useTranslations()
  const [activeTab, setActiveTab] = useState<MediaEntityType | 'all'>(entityType)
  const [selected, setSelected] = useState<string[]>([])
  const { isLoading, media } = useMediaLibrary({ entityType: activeTab })

  const handleToggle = (mediaId: string) => {
    setSelected((prev) =>
      prev.includes(mediaId) ? prev.filter((id) => id !== mediaId) : [...prev, mediaId],
    )
  }

  const handleConfirm = () => {
    const selectedMedia = media.filter((m) => selected.includes(m.id))

    onSelect(selectedMedia)
    setSelected([])
    onOpenChange(false)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setSelected([])
    onOpenChange(isOpen)
  }

  const canSelectMore = selected.length < maxSelectable

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t('admin.media.selectImages')}</DialogTitle>
        </DialogHeader>
        <Tabs onValueChange={(v) => setActiveTab(v as MediaEntityType | 'all')} value={activeTab}>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {t(tab.label)}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {isLoading ? (
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                  ))}
                </div>
              ) : media.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">
                  {t('admin.media.libraryEmpty')}
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {media.map((item) => (
                    <MediaItem
                      key={item.id}
                      isDisabled={!canSelectMore && !selected.includes(item.id)}
                      isSelected={selected.includes(item.id) || selectedIds.includes(item.id)}
                      media={item}
                      onToggle={() => handleToggle(item.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        <DialogFooter>
          <Button onClick={() => handleOpenChange(false)} type="button" variant="outline">
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

export { MediaLibraryDialog }
