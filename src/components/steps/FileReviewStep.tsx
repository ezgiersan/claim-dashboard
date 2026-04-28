import { FileReviewStep as FileReviewStepType } from '../../types/claim'

interface Props {
  data: FileReviewStepType
}

export default function FileReviewStep({ data }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{data.title}</p>
      <p className="text-xs text-muted-foreground">
        Başlangıç: {data.reviewReferralDate}
      </p>
      {data.reviewCompletionDate !== 'dd/mm/yyyy 00:00' && (
        <p className="text-xs text-muted-foreground">
          Tamamlanma: {data.reviewCompletionDate}
        </p>
      )}
    </div>
  )
}