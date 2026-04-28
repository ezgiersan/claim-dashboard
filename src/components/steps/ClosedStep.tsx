import { ClosedStep as ClosedStepType } from '../../types/claim'

interface Props {
  data: ClosedStepType
}

export default function ClosedStep({ data }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{data.title}</p>
      <p className="text-xs text-muted-foreground">
        Tamamlanma: {data.completionDate}
      </p>
    </div>
  )
}