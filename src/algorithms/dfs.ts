import { STATUS, type Cell } from "../graph-visualizer/GraphVisualizerContext";
import { dx, dy, isValid } from "./helpers";

export default function dfs(matrix: number[][], start: Cell, end: Cell) {
  const animations: { status: STATUS; points: Cell[] }[] = [];
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
          status: "VISITED",
          points: [{ x, y }],
        });
        if (traverse({ x, y }, end)) {
          return true;
        }
      }
    }

    animations.push({
      status: "DEAD_END",
      points: [start],
    });

    return false;
  }
}
