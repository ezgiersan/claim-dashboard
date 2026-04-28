import { ClaimNotificationStep as ClaimNotificationStepType } from '../../types/claim'

interface Props {
  data: ClaimNotificationStepType
}

export default function ClaimNotificationStep({ data }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{data.title}</p>
      <p className="text-xs text-muted-foreground">
        {data.reportType} · {data.reasonForDamage} · {data.reportingParty}
      </p>
      <p className="text-xs text-muted-foreground">{data.dateTime}</p>
    </div>
  )
}