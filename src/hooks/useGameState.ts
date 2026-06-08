import { useState } from "react";
import type { GameState } from "@/lib/types";

const initialState: GameState = {
  heroName: "",
  character: null,
  phase: "choice",
  affinity: 0,
  history: [],
  situationIndex: 0,
  turnCount: 0,
};

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);
  return { state, setState };
}
