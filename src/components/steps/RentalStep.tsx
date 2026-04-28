import { RentalStep as RentalStepType } from '../../types/claim'

interface Props {
  data: RentalStepType
}

export default function RentalStep({ data }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{data.title}</p>
      <p className="text-xs text-muted-foreground">
        {data.vehicleModel} · {data.vehicleDuration}
      </p>
    </div>
  )
}