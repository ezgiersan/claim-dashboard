import { TowingStep as TowingStepType } from '../../types/claim'

interface Props {
  data: TowingStepType
}

export default function TowingStep({ data }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{data.title}</p>
      <p className="text-xs text-muted-foreground">
        {data.pickupLocation} · {data.towingDate}
      </p>
    </div>
  )
}