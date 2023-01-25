import { create } from 'zustand'

interface ApplicationStore {
  step: number,
  dataResult: any,
  chosenGraphicType: string,
  gptSuggestion: string,
  setChoosenGraphicType: (type: string) => void,
  nextStep: () => void,
  previousStep: () => void,
  setGPTSuggestion: (data: string) => void,

  resetStep: () => void,
  setDataResult: (data: any) => void,
}



export const useApplicationStore = create<ApplicationStore>((set) => ({
  step: 0,
  dataResult: [],
  chosenGraphicType: '',
  gptSuggestion: "",
  setChoosenGraphicType: (type: string) => set({ chosenGraphicType: type }),
  setDataResult: (data: any) => set({ dataResult: data }),
  setGPTSuggestion: (data: any) => set({ gptSuggestion: data }),
  nextStep: () => set((state: { step: number }) => ({ step: state.step + 1 })),
  previousStep: () => set((state: { step: number }) => ({ step: state.step - 1 })),
  resetStep: () => set({ step: 0 }),

}))