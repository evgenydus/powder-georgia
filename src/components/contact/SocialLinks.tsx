import FacebookIcon from '@public/icons/brand/facebook.svg'
import InstagramIcon from '@public/icons/brand/instagram.svg'
import TelegramIcon from '@public/icons/brand/telegram.svg'

import { contact } from '@/constants'

const SocialLinks = () => (
  <ul className="flex items-center gap-4">
    <li>
      <a aria-label="Facebook" href={contact.facebook} rel="noopener noreferrer" target="_blank">
        <FacebookIcon className="size-6 fill-current transition-colors hover:fill-[#0866FF]" />
      </a>
    </li>

    <li>
      <a aria-label="Instagram" href={contact.instagram} rel="noopener noreferrer" target="_blank">
        <InstagramIcon className="size-6 fill-current transition-colors hover:fill-[#FF0069]" />
      </a>
    </li>

    <li>
      <a aria-label="Telegram" href={contact.telegram} rel="noopener noreferrer" target="_blank">
        <TelegramIcon className="size-6 fill-current transition-colors hover:fill-[#26A5E4]" />
      </a>
    </li>
  </ul>
)

export default SocialLinks
