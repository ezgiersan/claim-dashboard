import { DeductionStep as DeductionStepType } from '../../types/claim'

interface Props {
  data: DeductionStepType
  onUpload?: () => void
}

export default function DeductionStep({ data, onUpload }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{data.title}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-0.5">
        <p className="text-xs text-muted-foreground">
          Meslek Kesintisi: {data.occupationalDeduction}
        </p>
        <p className="text-xs text-muted-foreground">
          Değer Artışı: {data.appreciationDeduction}
        </p>
        <p className="text-xs text-muted-foreground">
          Poliçe Muafiyeti: {data.policyDeductible}
        </p>
      </div>
      {data.actionRequired && (
        <button
          onClick={onUpload}
          className="mt-2 w-fit rounded-md bg-warning-bg border-warning-text text-warning-text px-3 py-1.5 text-xs font-medium"
        >
          Meslek Belgesi Yükle
        </button>
      )}
    </div>
  )
}