import { Cell } from "../graph-visualizer/GraphVisualizerContext";

export function isValid(x: number, y: number, m: number, n: number) {
  return x >= 0 && x < m && y >= 0 && y < n;
}

export const dx = [0, 1, 0, -1];
export const dy = [1, 0, -1, 0];

export function generateRandomsWalls(m: number, n: number, wall_prob: number) {
  const ans: Cell[] = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (Math.random() < wall_prob) {
        ans.push({ x: i, y: j });
      }
    }
  }

  return ans;
}
