import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/ui'
import { cn } from '@/lib/utils'

interface SocialLink {
  icon: string
  url: string
  label: string
}

interface SocialsProps {
  socialUrls: Record<string, string | undefined>
  className?: string
}

const socialIcons: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  telegram: 'Send',
  whatsapp: 'MessageCircle',
}

export const Socials: React.FC<SocialsProps> = ({ socialUrls, className }) => {
  const socials: SocialLink[] = Object.entries(socialUrls)
    .filter(([, url]) => url)
    .map(([key, url]) => ({
      icon: socialIcons[key] || key,
      url: url!,
      label: key,
    }))

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {socials.map((social) => (
        <Link
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          aria-label={social.label}
        >
          <Icon name={social.icon as any} size="lg" />
        </Link>
      ))}
    </div>
  )
}
