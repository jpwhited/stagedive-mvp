export function calculateLevel(xp: number): number {
  // simple exponential formula: level increases every 100 xp
  return Math.floor(xp / 100) + 1;
}

export function xpForNextLevel(currentLevel: number): number {
  return currentLevel * 100;
}