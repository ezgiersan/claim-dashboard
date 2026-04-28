import { create } from 'zustand'

interface AIState {
  activeStepTitle: string | null
  response: string | null
  isLoading: boolean
  error: string | null
  explain: (stepTitle: string) => Promise<void>
  clear: () => void
}

export const useAIStore = create<AIState>((set) => ({
  activeStepTitle: null,
  response: null,
  isLoading: false,
  error: null,

  explain: async (stepTitle: string) => {
    set({ isLoading: true, activeStepTitle: stepTitle, response: null, error: null })

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [
            {
              role: 'user',
              content: `Sen bir sigorta uzmanısın. "${stepTitle}" adımını, hiç sigorta bilgisi olmayan bir müşteriye 2-3 cümleyle sade Türkçe ile açıkla.`,
            },
          ],
        }),
      })

      const data = await res.json()
      const text = data.content
        .filter((block: { type: string }) => block.type === 'text')
        .map((block: { type: string; text: string }) => block.text)
        .join('')

      set({ response: text, isLoading: false })
    } catch {
      set({ error: 'AI yanıtı alınamadı. Lütfen tekrar deneyin.', isLoading: false })
    }
  },

  clear: () => set({ activeStepTitle: null, response: null, isLoading: false, error: null }),
}))