import { create } from 'zustand'

interface ApplicationStore {
  step: number,
  dataResult: any,
  chosenGraphicType: string,
  setChoosenGraphicType: (type: string) => void,
  nextStep: () => void,
  previousStep: () =>void,
  resetStep: () => void,
  setDataResult: (data: any) => void,
}



export const useApplicationStore = create<ApplicationStore>((set) => ({

  step: 0,
  dataResult:[],
  chosenGraphicType: '',
  setChoosenGraphicType: (type: string) => set({ chosenGraphicType: type }),
  setDataResult: (data: any) => set({ dataResult: data }),
  nextStep: () => set((state: { step: number }) => ({ step: state.step + 1 })),
  previousStep: () => set((state: { step: number }) => ({ step: state.step - 1 })),
  resetStep: () => set({ step: 0 }),

}))