import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/navigation'

type EditButtonProps = {
  href: string
}

const EditButton = ({ href }: EditButtonProps) => (
  <Button asChild size="icon-sm" variant="ghost">
    <Link href={href}>
      <Pencil className="size-4" />
    </Link>
  </Button>
)

export { EditButton }
