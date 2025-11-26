import React from 'react'
import { useTranslations } from 'next-intl'
import { ContentContainer } from '@/containers'
import { Socials } from '@/components/Contact/Socials'
import { mockContact } from '@/mocks'

export const Footer: React.FC = () => {
  const t = useTranslations()

  return (
    <footer className="border-t bg-gray-50">
      <ContentContainer className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Powder Georgia</h3>
            <p className="text-sm text-gray-600">
              Your ultimate mountain guide to epic adventures in the Caucasus.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('navigation.contact')}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Email: {mockContact.email}</p>
              <p>Phone: {mockContact.phone}</p>
              <p>Address: {mockContact.address}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Tours</a></li>
              <li><a href="#" className="hover:text-primary">Transfers</a></li>
              <li><a href="#" className="hover:text-primary">About</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <Socials socialUrls={mockContact.socialUrls} />
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Powder Georgia. All rights reserved.</p>
        </div>
      </ContentContainer>
    </footer>
  )
}
