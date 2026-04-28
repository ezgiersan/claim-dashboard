import { NoteStep as NoteStepType } from '../../types/claim'

interface Props {
  data: NoteStepType
  onRemove?: () => void
}

export default function NoteStep({ data, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Not</p>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            Sil
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{data.content}</p>
    </div>
  )
}