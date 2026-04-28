import {icons} from "../lib/icons";

interface ClaimHeaderProps {
    fileNo: string
    currentStatus: string
    estimatedRemainingTime: string
    totalSteps: number
    completedSteps: number
  }
      const Icon = icons["Clock"];
  export default function ClaimHeader({
    fileNo,
    currentStatus,
    estimatedRemainingTime,
    totalSteps,
    completedSteps,
  }: ClaimHeaderProps) {
    const progressPercent = Math.round((completedSteps / totalSteps) * 100)

    return (
      <div className="rounded-xl bg-card p-5 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Hasar Dosyası
            </p>
            <p className="text-2xl font-medium">#{fileNo}</p>
            <p className="text-sm text-muted-foreground mt-1">{currentStatus}</p>
          </div>
  
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Tahmini Kalan Süre</p>
            <div className="flex items-center gap-2 justify-end">

            <Icon size={20} />
              <span className="text-xl font-medium">{estimatedRemainingTime}</span>
            </div>
          </div>
        </div>
  
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-muted-foreground">İlerleme</span>
            <span className="text-xs text-muted-foreground">
              {completedSteps}/{totalSteps} adım
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-progress-blue transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    )
  }