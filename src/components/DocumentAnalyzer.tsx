import { useState } from 'react'

type AnalysisState = 'idle' | 'analyzing' | 'success' | 'error'

export default function DocumentAnalyzer() {
  const [state, setState] = useState<AnalysisState>('idle')
  const [fileName, setFileName] = useState<string | null>(null)

  function handleFile(file: File) {
    setFileName(file.name)
    setState('analyzing')

    setTimeout(() => {
      const isValid = file.type === 'application/pdf' || file.type.startsWith('image/')
      setState(isValid ? 'success' : 'error')
    }, 2000)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function reset() {
    setState('idle')
    setFileName(null)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-sm font-medium mb-3">AI Belge Doğrulayıcı</p>

      {state === 'idle' && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border border-dashed border-border rounded-lg p-5 flex flex-col items-center gap-2 text-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-xs text-muted-foreground">
            Meslek Belgenizi sürükleyin
          </p>
          <label className="text-xs border border-border rounded-md px-3 py-1 cursor-pointer hover:bg-muted transition-colors">
            Dosya Seç
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-muted-foreground">PDF, JPG, PNG — maks. 10MB</p>
        </div>
      )}

      {state === 'analyzing' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-8 h-8 rounded-full border-2 border-purple-300 border-t-purple-600 animate-spin" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">{fileName}</span> analiz ediliyor...
          </p>
        </div>
      )}

      {state === 'success' && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-green-700">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p className="text-sm font-medium">Belge Geçerli</p>
          </div>
          <p className="text-xs text-muted-foreground">{fileName} başarıyla doğrulandı.</p>
          <button
            onClick={reset}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit mt-1"
          >
            Yeni belge yükle
          </button>
        </div>
      )}

      {state === 'error' && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-destructive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <p className="text-sm font-medium">Geçersiz Belge</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Lütfen PDF veya görsel formatında bir dosya yükleyin.
          </p>
          <button
            onClick={reset}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit mt-1"
          >
            Tekrar dene
          </button>
        </div>
      )}
    </div>
  )
}