import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'

type ActiveSectionProps = {
  isActive: boolean
  onCheckedChange: (checked: boolean) => void
}

const ActiveSection = ({ isActive, onCheckedChange }: ActiveSectionProps) => (
  <section className="space-y-4">
    <div className="flex items-center gap-3 rounded-md border p-4">
      <Checkbox checked={isActive} id="is_active" onCheckedChange={onCheckedChange} />
      <div>
        <Label htmlFor="is_active">Active</Label>
        <p className="text-sm text-gray-500">Is this tour visible to users?</p>
      </div>
    </div>
  </section>
)

export { ActiveSection }
