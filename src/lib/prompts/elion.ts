import type { Phase, Situation } from "@/lib/types";
import { toEmotionalState } from "@/lib/affinity";

export type PromptParams = {
  heroName: string;
  affinity: number;
  phase: Phase;
  situation?: Situation;
  chosenTone?: string;
};

export function buildElionPrompt(params: PromptParams): string {
  // TODO: implement
  throw new Error("Not implemented");
}
