import Cell from "../graph-visualizer/Cell";
import type { STATUS } from "../graph-visualizer/GraphVisualizerContext";
import { dx, dy, isValid } from "./helpers";

export default function bfs(matrix: number[][], start: Cell, end: Cell) {
  const queue: Cell[] = [];
  const animations: { status: STATUS; points: Cell[] }[] = [];
  const m = matrix.length;
  const n = matrix[0].length;
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));
  queue.push(start);

  while (queue.length > 0) {
    let size = queue.length;
    const tmpVisitedCells = [];

    while (size > 0) {
      const curr = queue.shift();

      if (!curr) break;

      for (let i = 0; i < 4; i++) {
        const x = curr.x + dx[i];
        const y = curr.y + dy[i];

        if (isValid(x, y, m, n) && matrix[x][y] === 0 && !visited[x][y]) {
          visited[x][y] = true;
          queue.push({ x, y });
          tmpVisitedCells.push({ x, y });
          if (x === end.x && y === end.y) {
            animations.push({
              status: "VISITED",
              points: tmpVisitedCells,
            });
            return animations;
          }
        }
      }

      size--;
    }

    animations.push({
      status: "VISITED",
      points: tmpVisitedCells,
    });
  }

  return animations;
}
