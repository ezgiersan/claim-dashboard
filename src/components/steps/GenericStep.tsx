import { ProcessDetail } from '../../types/claim'

interface Props {
  data: ProcessDetail
}

export default function GenericStep({ data }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{data.title}</p>
      <p className="text-xs text-muted-foreground">{data.status}</p>
    </div>
  )
}