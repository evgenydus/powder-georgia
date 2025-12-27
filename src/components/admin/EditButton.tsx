import { Pencil } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

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
