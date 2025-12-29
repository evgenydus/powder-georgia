import { Link } from '@/i18n/navigation'

type AdminPageHeaderProps = {
  createHref: string
  createLabel: string
  title: string
}

export const AdminPageHeader = ({ createHref, createLabel, title }: AdminPageHeaderProps) => (
  <div className="mb-8 flex items-center justify-between">
    <h1 className="text-3xl font-bold">{title}</h1>
    <Link href={createHref}>
      <span className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-4 py-2 transition-colors">
        {createLabel}
      </span>
    </Link>
  </div>
)
