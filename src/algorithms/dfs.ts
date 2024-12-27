import { type Cell } from "../graph-visualizer/GraphVisualizerContext";

export const STATUS = {
  VISITED: "VISITED",
  DEAD_END: "DEAD_END",
};

export default function dfs(matrix: number[][], start: Cell, end: Cell) {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  const animations: { status: string; point: Cell }[] = [];
  const m = matrix.length;
  const n = matrix[0].length;

  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));

  traverse(start, end);

  return animations;

  // Helper function to traverse the matrix dfs
  function traverse(start: Cell, end: Cell) {
    visited[start.x][start.y] = true;

    if (start.x === end.x && start.y === end.y) {
      return true;
    }

    for (let i = 0; i < 4; i++) {
      const x = start.x + dx[i];
      const y = start.y + dy[i];

      if (isValid(x, y, m, n) && matrix[x][y] === 0 && !visited[x][y]) {
        animations.push({
          status: STATUS.VISITED,
          point: { x, y },
        });
        if (traverse({ x, y }, end)) {
          return true;
        }
      }
    }

    animations.push({
      status: STATUS.DEAD_END,
      point: start,
    });

    return false;
  }
}

export function isValid(x: number, y: number, m: number, n: number) {
  return x >= 0 && x < m && y >= 0 && y < n;
}
