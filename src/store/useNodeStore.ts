import { create } from 'zustand'
import { ProcessDetail } from '../types/claim'

interface NodeStore {
  steps: ProcessDetail[]
  setSteps: (steps: ProcessDetail[]) => void
  addNoteAfter: (index: number, content: string) => void
  addAttachmentAfter: (index: number, fileName: string) => void
  removeStep: (id: string) => void
}

export const useNodeStore = create<NodeStore>((set) => ({
  steps: [],

  setSteps: (steps) => set({ steps }),

  addNoteAfter: (index, content) =>
    set((state) => {
      const newStep: ProcessDetail = {
        title: 'Note',
        status: 'Note',
        content,
        id: crypto.randomUUID(),
      }
      const updated = [...state.steps]
      updated.splice(index + 1, 0, newStep)
      return { steps: updated }
    }),

  addAttachmentAfter: (index, fileName) =>
    set((state) => {
      const newStep: ProcessDetail = {
        title: 'Attachment',
        status: 'Attachment',
        fileName,
        id: crypto.randomUUID(),
      }
      const updated = [...state.steps]
      updated.splice(index + 1, 0, newStep)
      return { steps: updated }
    }),

  removeStep: (id) =>
    set((state) => ({
      steps: state.steps.filter(
        (s) => !('id' in s) || s.id !== id
      ),
    })),
}))