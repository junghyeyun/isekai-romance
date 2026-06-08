import type { Phase, Situation } from "@/lib/types";

export type PromptParams = {
  heroName: string;
  affinity: number;
  phase: Phase;
  situation?: Situation;
  chosenTone?: string;
};

export function buildElionPrompt(_params: PromptParams): string {
  throw new Error("Not implemented");
}
