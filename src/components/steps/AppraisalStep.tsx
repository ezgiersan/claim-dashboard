import { AppraisalStep as AppraisalStepType } from '../../types/claim'

interface Props {
  data: AppraisalStepType
}

export default function AppraisalStep({ data }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{data.title}</p>
      <p className="text-xs text-muted-foreground">
        {data.expertInfo} · {data.expertAssignmentDate}
      </p>
      <p className="text-xs text-muted-foreground">{data.contact}</p>
    </div>
  )
}