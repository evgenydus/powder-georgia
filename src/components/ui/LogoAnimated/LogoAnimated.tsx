import type { FC } from 'react'

import LogoSnowflakeSVG from './LogoSnowflakeSVG'
import LogoTextSVG from './LogoTextSVG'

const LogoAnimated: FC = () => (
  <div className="flex h-fit">
    <div className="w-7.5 overflow-hidden lg:w-12.75">
      <LogoSnowflakeSVG className="animate-spin-slow w-15 lg:w-25.5" />
    </div>
    <LogoTextSVG className="ml-1 w-28 fill-white lg:w-48" />
  </div>
)

export default LogoAnimated
