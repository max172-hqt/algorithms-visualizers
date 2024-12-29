import Cell from "../graph-visualizer/Cell";
import type { STATUS } from "../graph-visualizer/GraphVisualizerContext";
import { dx, dy, isValid } from "./helpers";

export default function bfs(matrix: number[][], start: Cell, end: Cell) {
  const queue: Cell[] = [];
  const animations: { status: STATUS; points: Cell[] }[] = [];
  const m = matrix.length;
  const n = matrix[0].length;
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));
  const path: (Cell | null)[][] = new Array(m)
    .fill(0)
    .map(() => new Array(n).fill(null));

  let found = false;

  queue.push(start);

  while (queue.length > 0) {
    let size = queue.length;
    const tmpVisitedCells = [];

    if (found) break;

    while (size > 0) {
      const curr = queue.shift();

      if (!curr) break;

      for (let i = 0; i < 4; i++) {
        const x = curr.x + dx[i];
        const y = curr.y + dy[i];

        if (isValid(x, y, m, n) && matrix[x][y] === 0 && !visited[x][y]) {
          path[x][y] = curr;
          visited[x][y] = true;
          queue.push({ x, y });
          tmpVisitedCells.push({ x, y });
          if (x === end.x && y === end.y) {
            found = true;
            break;
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

  if (!found) return animations;

  // Generate shortest path animation
  console.log(path);
  let curr: Cell | null = end;
  const shortestPathAnimations: { status: STATUS; points: Cell[] }[] = [];
  while (curr !== null && (curr.x !== start.x || curr.y !== start.y)) {
    shortestPathAnimations.push({
      status: "SHORTEST_PATH",
      points: [curr],
    });
    curr = path[curr.x][curr.y];
  }

  shortestPathAnimations.reverse();

  return [...animations, ...shortestPathAnimations];
}
