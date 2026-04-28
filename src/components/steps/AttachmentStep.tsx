import { AttachmentStep as AttachmentStepType } from '../../types/claim'

interface Props {
  data: AttachmentStepType
  onRemove?: () => void
}

export default function AttachmentStep({ data, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Ek Dosya</p>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            Sil
          </button>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground"
        >
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
        <p className="text-xs text-muted-foreground">{data.fileName}</p>
      </div>
    </div>
  )
}