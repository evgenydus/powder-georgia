import type { ReactNode } from 'react'

type AdminTableProps = { children: ReactNode }

export const AdminTable = ({ children }: AdminTableProps) => (
  <div className="bg-card overflow-x-auto rounded-lg">
    <table className="divide-border min-w-full divide-y">{children}</table>
  </div>
)

export const Thead = ({ children }: AdminTableProps) => (
  <thead className="bg-muted">
    <tr>{children}</tr>
  </thead>
)

export const Th = ({ children }: { children?: ReactNode }) => (
  <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
    {children}
  </th>
)

export const Tbody = ({ children }: AdminTableProps) => (
  <tbody className="divide-border divide-y">{children}</tbody>
)

export const Td = ({ children, className = '' }: { children?: ReactNode; className?: string }) => (
  <td className={`px-6 py-4 text-sm whitespace-nowrap ${className}`}>{children}</td>
)
