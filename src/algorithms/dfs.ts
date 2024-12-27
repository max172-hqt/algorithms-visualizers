export default function dfs(
  matrix: number[][],
  start: number[],
  end: number[]
) {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  const animations: { status: string; point: number[] }[] = [];

  const m = matrix.length;
  const n = matrix[0].length;

  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));

  traverse(start, end);

  return animations;

  function traverse(start: number[], end: number[]) {
    visited[start[0]][start[1]] = true;

    if (start[0] === end[0] && start[1] === end[1]) {
      return true;
    }

    for (let i = 0; i < 4; i++) {
      const x = start[0] + dx[i];
      const y = start[1] + dy[i];

      if (isValid(x, y, m, n) && matrix[x][y] === 0 && !visited[x][y]) {
        animations.push({
          status: "inpath",
          point: [x, y],
        });
        if (traverse([x, y], end)) {
          return true;
        }
      }
    }

    animations.push({
      status: "done",
      point: start,
    });

    return false;
  }
}

function isValid(x: number, y: number, m: number, n: number) {
  return x >= 0 && x < m && y >= 0 && y < n;
}
