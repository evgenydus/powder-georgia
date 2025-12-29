type FormFieldProps = {
  children: React.ReactNode
  error?: string
  label: string
}

export const FormField = ({ children, error, label }: FormFieldProps) => (
  <div>
    <label className="text-foreground mb-1 block text-sm font-medium">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
)
