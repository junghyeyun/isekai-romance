export function applyDelta(current: number, delta: number): number {
  return Math.min(100, Math.max(0, current + delta));
}

export function toAffinityLabel(affinity: number): string {
  if (affinity <= 20) return "경계";
  if (affinity <= 50) return "관심";
  if (affinity <= 80) return "호감";
  return "연모";
}

export function toEmotionalState(affinity: number): string {
  if (affinity <= 20) return "이 인물은 아직 경계심이 강한 상태입니다. 마음을 전혀 열지 않았습니다.";
  if (affinity <= 50) return "이 인물은 조금씩 관심이 생기고 있지만 아직 마음을 열지 않은 상태입니다.";
  if (affinity <= 80) return "이 인물은 감정이 싹트고 있습니다. 본심이 간간이 새어나오는 상태입니다.";
  return "이 인물은 깊이 마음을 빼앗긴 상태입니다. 솔직해지려는 충동이 강해지고 있습니다.";
}
