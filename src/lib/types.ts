export type CharacterKey = "kalian" | "elion" | "sion";

export type Phase = "choice" | "freeChat" | "ending";

export type Choice = {
  text: string;
  delta: number;
  tone: string;
};

export type Situation = {
  id: string;
  character: CharacterKey;
  image: string;
  narration: string;
  characterLine: string;
  choices: [Choice, Choice, Choice];
};

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type GameState = {
  heroName: string;
  character: CharacterKey | null;
  phase: Phase;
  affinity: number;
  history: Message[];
  situationIndex: number;
  turnCount: number;
};

// ── API ──────────────────────────────────────────────────

export type ChatRequestChoice = {
  character: CharacterKey;
  heroName: string;
  phase: "choice";
  situation: Situation;
  chosenTone: string;
  affinity: number;
  history: Message[];
};

export type ChatRequestFreeChat = {
  character: CharacterKey;
  heroName: string;
  phase: "freeChat";
  userMessage: string;
  affinity: number;
  history: Message[];
};

export type ChatRequest = ChatRequestChoice | ChatRequestFreeChat;

export type ChatResponse = {
  reply: string;
};

export type EndingRequest = {
  character: CharacterKey;
  affinity: number;
  history: Message[];
};

export type EndingResponse = {
  type: "happy" | "normal";
  narrative: string;
};
