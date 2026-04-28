import { useState } from "react";
import { useNodeStore } from "../store/useNodeStore";
import { useAIStore } from "../store/useAIStore";
import { getStepComponent } from "./steps/registry";
import { ProcessDetail } from "../types/claim";
import { icons } from "../lib/icons";
import { getStatusMeta } from "../lib/status";
import { AIDrawer } from "../components/AIDrawer";
import { useAI } from "../hooks/useAI";
import StepActionDropdown from "../components/StepActionDropdown";

function getStatusBadge(status: string) {
  switch (status) {
    case "Completed":
    case "Report Completed":
      return "bg-badge-success border-badge-success-text text-badge-success-text";
    case "In Progress":
      return "bg-badge-blue border-text-badge-blue text-badge-blue-text";
    case "Pending":
      return "bg-badge-gray border-badge-gray text-badge-gray-text";
    case "Note":
      return "bg-purple-100 text-purple-800";
    case "Attachment":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-badge-gray border-badge-gray text-badge-gray-text";
  }
}

function isUserAdded(step: ProcessDetail) {
  return step.title === "Note" || step.title === "Attachment";
}

interface AddNodeModalProps {
  index: number;
  onClose: () => void;
}

function AddNodeModal({ index, onClose }: AddNodeModalProps) {
  const { addNoteAfter, addAttachmentAfter } = useNodeStore();
  const [type, setType] = useState<"note" | "attachment">("note");
  const [value, setValue] = useState("");

  function handleAdd() {
    if (!value.trim()) return;
    if (type === "note") addNoteAfter(index, value);
    else addAttachmentAfter(index, value);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      {/* Arka plan overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Sağdan açılan panel */}
      <div
        className="relative w-80 h-full bg-card border-l border-border shadow-2xl flex flex-col animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="text-sm font-medium">Adım Ekle</p>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* İçerik */}
        <div className="flex flex-col gap-4 px-5 py-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Tür seçin</p>
            <div className="flex gap-2">
              <button
                onClick={() => setType("note")}
                className={`flex-1 text-xs px-3 py-2 rounded-md border transition-colors ${
                  type === "note"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                📝 Not
              </button>
              <button
                onClick={() => setType("attachment")}
                className={`flex-1 text-xs px-3 py-2 rounded-md border transition-colors ${
                  type === "attachment"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                📎 Ek Dosya
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {type === "note" ? "Not içeriği" : "Dosya adı"}
            </p>
            <input
              type="text"
              placeholder={type === "note" ? "Not içeriği..." : "Dosya adı..."}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              className="w-full text-xs border border-border rounded-md px-3 py-2 bg-background text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-5 py-4 border-t border-border flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 text-xs border border-border rounded-md py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 text-xs bg-primary text-primary-foreground rounded-md py-2 hover:opacity-90 transition-opacity"
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StepTimeline() {
  const { steps, removeStep } = useNodeStore();
  const { explain, activeStepTitle, isLoading } = useAIStore();
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [openActionIndex, setOpenActionIndex] = useState<number | null>(null);

  const { selectedStep, isOpen, response, loading, open, close, askAI } =
    useAI();

  const ChevronRight = icons["ChevronRight"];
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-xl overflow-hidden">
        {steps.map((step, index) => {
          const StepComponent = getStepComponent(step.title);
          const isActive = step.status === "In Progress";
          const isExplaining = activeStepTitle === step.title && isLoading;

          return (
            <div key={index}>
              <div className="flex items-start gap-4 px-5">
                {/* Sol: ikon + çizgi */}
                <div className="flex flex-col items-center self-stretch">
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      isActive
                        ? "border border-blue-400/60 bg-blue-400/10"
                        : step.status === "Completed" ||
                          step.status === "Report Completed"
                        ? "border border-green-400/60 bg-green-400/10"
                        : step.status === "Pending"
                        ? "border border-gray-500/60 bg-gray-500/10"
                        : "border border-yellow-400/60 bg-yellow-400/10"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-50" />
                    )}
                    {(() => {
                      const Icon = icons[step.title];
                      return (
                        <Icon
                          size={20}
                          className={
                            isActive
                              ? "text-blue-400"
                              : step.status === "Completed" ||
                                step.status === "Report Completed"
                              ? "text-green-400"
                              : step.status === "Pending"
                              ? "text-gray-500"
                              : "text-yellow-400"
                          }
                        />
                      );
                    })()}
                  </div>

                  {/* Çizgi */}
                  <div
                    className={`w-0.5 flex-1 mt-1 ${
                      step.status === "Completed" ||
                      step.status === "Report Completed"
                        ? "bg-green-500"
                        : step.status === "In Progress"
                        ? "bg-blue-400"
                        : "bg-gray-600"
                    }`}
                  />
                </div>

                {/* Sağ: card */}
                <div className="flex-1 mb-3">
                  <div className="rounded-lg shadow-sm bg-card p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadge(
                          step.status
                        )}`}
                      >
                        {getStatusMeta(step.status).label}
                      </span>
                      {!isUserAdded(step) && (
                        <button
                          onClick={() => open(step)}
                          className="text-xs flex items-center gap-1 rounded-md px-2 py-1 text-gray-500 cursor-pointer"
                        >
                          AI ile aç
                          <ChevronRight size={20} />
                        </button>
                      )}
                    </div>
                    <StepComponent
                      data={step}
                      onRemove={
                        isUserAdded(step) && "id" in step
                          ? () => removeStep((step as { id: string }).id)
                          : undefined
                      }
                    />
                  </div>
                  {/* + butonu */}
                  <div className="flex justify-center">
                    {/* <div className="flex-1 h-px bg-border" /> */}
                    {/* <button
                      onClick={() => setOpenModalIndex(index)}
                      className="w-6 h-6 rounded-full border border-border border-dashed cursor-pointer bg-card flex items-center justify-center text-muted-foreground hover:text-blue-400 hover:border-blue-400 transition-all duration-300 text-sm group"
                    >
                      <span className="inline-block transition-transform duration-300 group-hover:rotate-90">
                        +
                      </span>
                    </button> */}
                    <StepActionDropdown index={index} />

                    {/* <div className="flex-1 h-px bg-border" /> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal map dışında */}
      {/* {openModalIndex !== null && (
        <AddNodeModal
          index={openModalIndex}
          onClose={() => setOpenModalIndex(null)}
        />
      )} */}

      <AIDrawer
        open={isOpen}
        onClose={close}
        step={selectedStep}
        onAskAI={askAI}
        aiResponse={response}
        loading={loading}
      />
    </div>
  );
}
