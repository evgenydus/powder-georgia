'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'

import type { MediaEntityType } from '@/types'

const tabs: (MediaEntityType | 'all')[] = ['all', 'tour', 'apartment', 'transfer', 'instructor']

type EntityTabsProps = {
  activeTab: MediaEntityType | 'all'
  onTabChange: (tab: MediaEntityType | 'all') => void
}

export const EntityTabs = ({ activeTab, onTabChange }: EntityTabsProps) => {
  const t = useTranslations()

  return (
    <div className="flex gap-1 border-b pb-2">
      {tabs.map((tab) => (
        <Button
          key={tab}
          onClick={() => onTabChange(tab)}
          size="sm"
          type="button"
          variant={activeTab === tab ? 'default' : 'ghost'}
        >
          {t(`admin.media.tabs.${tab}`)}
        </Button>
      ))}
    </div>
  )
}
