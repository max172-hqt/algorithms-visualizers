export function isValid(x: number, y: number, m: number, n: number) {
  return x >= 0 && x < m && y >= 0 && y < n;
}

export const dx = [0, 1, 0, -1];
export const dy = [1, 0, -1, 0];
