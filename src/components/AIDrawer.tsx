import type { ProcessDetail } from "../types/claim";
import { getStatusMeta } from "../lib/status";
import { icons } from "../lib/icons";

export function AIDrawer({
  open,
  onClose,
  step,
  onAskAI,
  aiResponse,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  step: ProcessDetail | null;
  onAskAI: () => void;
  aiResponse: string;
  loading: boolean;
}) {
  if (!open || !step) return null;
  function formatKey(key: string) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }
  const Icon = icons[step.title];
  const IconAI = icons["AI"];
  return (
    <div className="fixed inset-0 z-50 flex ">
      <div className="flex-1 " onClick={onClose} />

      <div className="w-[420px] h-full bg-card p-6 shadow-2xl flex flex-col  animate-slide-in-right opacity-95">
        <div className="flex items-center justify-between mb-6 pb-4 ">
          <div className="flex items-center">
            <Icon size={30} />
            <div className="ms-2">
              <div className="text-lg font-semibold ">{step.title}</div>
              <div
                className={`${getStatusMeta(step.status).textClass} text-xs`}
              >
                {getStatusMeta(step.status).label}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className=" border rounded-lg border-gray-800 py-3">
          {/* Detay alanları */}
          <div className="space-y-3">
            {Object.entries(step).map(([key, value]) => {
              if (key === "title" || key === "status" || key === "id")
                return null;

              return (
                <div
                  key={key}
                  className="flex justify-between items-start gap-4  px-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <span className="text-sm text-muted-foreground font-medium shrink-0">
                    {formatKey(key)}
                  </span>
                  <span className="text-sm text-foreground text-right break-words">
                    {String(value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* AI section */}
        <div className="mt-4 border rounded-lg border-gray-800 px-3 py-3">
          <div className="flex items-center mb-1">
            <IconAI size={15} />
            <div className="ms-1 text-sm">AI Asistan</div>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
              <span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
              AI düşünüyor...
            </div>
          )}

          {aiResponse && !loading && (
            <div className="mt-3 text-sm bg-muted/50  leading-relaxed">
              {aiResponse}
            </div>
          )}

          {!loading && !aiResponse && (
            <button
              onClick={onAskAI}
              className="w-full bg-button-gray text-primary-foreground text-sm rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              AI ile Açıkla
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
