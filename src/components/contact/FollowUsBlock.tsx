'use client'

import { useTranslations } from 'next-intl'

import SocialLinks from './SocialLinks'

const FollowUsBlock = () => {
  const t = useTranslations()

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold">{t('footer.followUs')}</h3>
      <SocialLinks />
    </div>
  )
}

export default FollowUsBlock
