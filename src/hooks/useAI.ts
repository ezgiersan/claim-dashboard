import { useState } from "react";
import type { ProcessDetail } from "../types/claim";

export function useAI() {
  const [selectedStep, setSelectedStep] = useState<ProcessDetail | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // drawer aç
  const open = (step: ProcessDetail) => {
    setSelectedStep(step);
    setIsOpen(true);
    setResponse("");
  };

  // drawer kapat
  const close = () => {
    setIsOpen(false);
    setSelectedStep(null);
  };

  // AI çağrısı
  const askAI = async () => {
    if (!selectedStep) return;

    setLoading(true);

    try {
      // 🔹 MOCK (şimdilik)
      await new Promise((res) => setTimeout(res, 1000));

      setResponse(
        `${selectedStep.title} adımı AI tarafından analiz edildi. Bu adım süreçte kritik bir rol oynar.`
      );
    } catch (error) {
      setResponse("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedStep,
    isOpen,
    response,
    loading,
    open,
    close,
    askAI,
  };
}
