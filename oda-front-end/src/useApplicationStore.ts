import { create } from "zustand";

interface ApplicationStore {
  step: number;
  dataResult: any;
  chosenGraphicType: string;
  gptSuggestion: string;
  query: string;
  source: string;
  entryValues: any[];
  outValues: any[];
  visualisation: any;
  setVisualisation: (data: any) => void;
  setEntryValues: (data: any) => void;
  setOutValues: (data: any) => void;
  setChoosenGraphicType: (type: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  setStep: (data: number) => void;
  setGPTSuggestion: (data: string) => void;
  setQuery: (data: string) => void;
  setSource: (data: string) => void;
  resetStep: () => void;
  setDataResult: (data: any) => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  step: 0,
  dataResult: [],
  chosenGraphicType: "",
  gptSuggestion: "",
  query: "",
  entryValues: [],
  outValues: [],
  source: "",
  visualisation: {},
  setVisualisation: (data: any) => set({ visualisation: data }),
  setSource: (data: string) => set({ source: data }),
  setEntryValues: (data: any) => set({ entryValues: data }),
  setOutValues: (data: any) => set({ outValues: data }),
  setChoosenGraphicType: (type: string) => set({ chosenGraphicType: type }),
  setDataResult: (data: any) => set({ dataResult: data }),
  setGPTSuggestion: (data: any) => set({ gptSuggestion: data }),
  setQuery: (data: any) => set({ query: data }),
  nextStep: () => set((state: { step: number }) => ({ step: state.step + 1 })),
  previousStep: () =>
    set((state: { step: number }) => ({ step: state.step - 1 })),
  setStep: (data: number) => set({ step: data }),
  resetStep: () => set({ step: 0 }),
}));
