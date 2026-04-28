import { useEffect } from 'react'
import { useClaim } from './hooks/useClaim'
import { useNodeStore } from './store/useNodeStore'
import ClaimHeader from './components/ClaimHeader'
import ActionAlert from './components/ActionAlert'
import StepTimeline from './components/StepTimeline'
import AIPanel from './components/AIPanel'
import DocumentAnalyzer from './components/DocumentAnalyzer'

export default function App() {
  const { data, isLoading, isError } = useClaim()
  const { steps, setSteps } = useNodeStore()

  useEffect(() => {
    if (data) setSteps(data.processDetails)
  }, [data, setSteps])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="w-8 h-8 rounded-full border-2 border-muted border-t-primary animate-spin" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <p className="text-sm text-muted-foreground">Veri yüklenemedi.</p>
      </div>
    )
  }

  const completedSteps = steps.filter(
    (s) => s.status === 'Completed' || s.status === 'Report Completed'
  ).length

  const actionStep = steps.find(
    (s) => 'actionRequired' in s && s.actionRequired
  )

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-4">
        <ClaimHeader
          fileNo={data.fileNo}
          currentStatus={data.currentStatus}
          estimatedRemainingTime={data.estimatedRemainingTime}
          totalSteps={steps.length}
          completedSteps={completedSteps}
        />

        {actionStep && 'actionRequired' in actionStep && (
          <ActionAlert
            message={`${actionStep.actionRequired} — işleminizin devam edebilmesi için bu belgeyi yüklemeniz gerekiyor.`}
            onAction={() => {}}
          />
        )}

        {/* <div className="flex flex-col lg:flex-row gap-4 items-start"> */}
          <div className="w-full max-w-3xl mx-auto">
            <StepTimeline />
          </div>
          {/* <div className="w-full lg:w-72 flex flex-col gap-4">
            <AIPanel />
            <DocumentAnalyzer />
          </div> */}
        </div>
      {/* </div> */}
    </div>
  )
}