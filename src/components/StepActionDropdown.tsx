import { useState } from "react";
import { useNodeStore } from "../store/useNodeStore";

type ActionType = "Bilgi Notu Ekle" | "Ek Belge Ekle";

interface Props {
  index: number;
}

export default function StepActionDropdown({ index }: Props) {
  const addNoteAfter = useNodeStore((s) => s.addNoteAfter);
  const addAttachmentAfter = useNodeStore((s) => s.addAttachmentAfter);

  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ActionType | null>(null);
  const [value, setValue] = useState("");

  const handleSelect = (type: ActionType) => {
    setSelectedType(type);
  };

  const handleSubmit = () => {
    if (!selectedType || !value.trim()) return;

    if (selectedType === "Bilgi Notu Ekle") {
      addNoteAfter(index, value);
    }

    if (selectedType === "Ek Belge Ekle") {
      addAttachmentAfter(index, value);
    }

    setValue("");
    setSelectedType(null);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-6 h-6 rounded-full border border-border border-dashed cursor-pointer bg-card flex items-center justify-center text-muted-foreground hover:text-blue-400 hover:border-blue-400 transition-all duration-300 text-sm group"
      >
        <span className="inline-block transition-transform duration-300 group-hover:rotate-90">
          +
        </span>
      </button>

      {open && (
  <div className="bg-card right-0 absolute p-2 border rounded-lg border-gray-800 shadow-sm w-52 z-50">

        {/* DROPDOWN OPTIONS */}
        {open && !selectedType && (
          <div className="mt-2 flex flex-col gap-2">
            <button
              onClick={() => handleSelect("Bilgi Notu Ekle")}
              className="text-left px-3 py-2 cursor-pointer rounded-md bg-muted hover:bg-muted/70 text-sm"
            >
              Bilgi Notu Ekle
            </button>

            <button
              onClick={() => handleSelect("Ek Belge Ekle")}
              className="text-left px-3 py-2 cursor-pointer rounded-md bg-muted hover:bg-muted/70 text-sm"
            >
              Ek Belge Ekle
            </button>
          </div>
        )}

        {/* INPUT AREA */}
        {selectedType && (
  <div className="mt-3 flex flex-col gap-2">
    


    {/* INPUT */}
    <input
      className="w-full border rounded-md p-2 text-sm border-gray-800 outline-none focus:outline-none focus:ring-0 focus:border-gray-500"
      placeholder={
        selectedType === "Bilgi Notu Ekle"
          ? "Not yaz..."
          : "Belge adı / açıklama yaz..."
      }
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />

    {/* ACTION BUTTONS */}
    <div className="flex gap-2 items-center justify-center">
          {/* BACK */}
    <button
      onClick={() => {
        setSelectedType(null);
        setValue("");
      }}
      className="text-xs text-muted-foreground hover:text-foreground cursor-pointer "
    >
      Geri
    </button>
      {/* Ekle */}
      <button
        onClick={handleSubmit}
        className="flex-1 bg-button-gray  cursor-pointer  rounded-md transition-colors transition-all duration-300 ease-in-out hover:brightness-110"
      >
        Ekle
      </button>

    </div>
  </div>
)}

  </div>
)}

    </div>
  );
}
