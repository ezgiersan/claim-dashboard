import { useAIStore } from '../store/useAIStore'

export default function AIPanel() {
  const { activeStepTitle, response, isLoading, error, clear } = useAIStore()

  return (
    <div className="flex flex-col gap-3">
      {/* AI Asistan */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs">
              ✦
            </div>
            <p className="text-sm font-medium">AI Asistan</p>
          </div>
          {(response || isLoading) && (
            <button
              onClick={clear}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Kapat
            </button>
          )}
        </div>

        {!activeStepTitle && !response && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            Herhangi bir adımın yanındaki <span className="font-medium">✦ Açıkla</span> butonuna tıklayarak o adım hakkında AI'dan açıklama alabilirsiniz.
          </p>
        )}

        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
            <p className="text-xs text-muted-foreground">
              "{activeStepTitle}" açıklanıyor...
            </p>
          </div>
        )}

        {response && !isLoading && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">
              {activeStepTitle}
            </p>
            <p className="text-sm leading-relaxed">{response}</p>
          </div>
        )}

        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    </div>
  )
}