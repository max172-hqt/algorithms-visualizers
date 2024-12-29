import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Cell,
  type CELL_TYPE,
  GraphVisualizerContext,
  STATUS,
} from "./GraphVisualizerContext";
import dfs from "../algorithms/dfs";
import { generateRandomsWalls, isValid } from "../algorithms/helpers";
import bfs from "../algorithms/bfs";

function GraphVisualizerProvider({ children }: PropsWithChildren) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentCellType, setCurrentCellType] = useState<CELL_TYPE | null>(
    null
  );
  const [m, setM] = useState(15);
  const [n, setN] = useState(15);
  const [animationSpeed, setAnimationSpeed] = useState(20);
  const [start, setStart] = useState<Cell>({ x: 0, y: 0 });
  const [end, setEnd] = useState<Cell>({ x: m - 1, y: n - 1 });
  const [walls, setWalls] = useState<Cell[]>([]);
  const [cells, setCells] = useState<Cell[][]>([]);
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  const matrix = useMemo(() => {
    const res = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (const { x, y } of walls) {
      if (isValid(x, y, m, n)) {
        res[x][y] = 1;
      }
    }
    return res;
  }, [m, n, walls]);

  const getType = useCallback(
    (x: number, y: number) => {
      if (x === start.x && y === start.y) {
        return "START";
      } else if (x === end.x && y === end.y) {
        return "END";
      } else if (matrix[x][y] === 1) {
        return "WALL";
      }
      return "BLANK";
    },
    [end.x, end.y, matrix, start.x, start.y]
  );

  useEffect(() => {
    const res = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        res[i][j] = {
          x: i,
          y: j,
          type: getType(i, j),
        };
      }
    }
    setCells(res);
  }, [getType, m, n]);

  function runDfs() {
    resetPath();
    const animations = dfs(matrix, start, end);
    runAnimation(animations);
  }

  function runBfs() {
    resetPath();
    const animations = bfs(matrix, start, end);
    runAnimation(animations);
  }

  function runAnimation(animations: { status: STATUS; points: Cell[] }[]) {
    for (let i = 0; i < animations.length; i++) {
      const points = animations[i].points;
      const status = animations[i].status;
      const id = setTimeout(() => {
        setCells((cells) => {
          return cells.map((row, i) => {
            return row.map((cell, j) => {
              for (const point of points) {
                if (point.x === i && point.y === j) {
                  return { ...cell, status };
                }
              }
              return cell;
            });
          });
        });
      }, i * animationSpeed);

      setTimeoutIds((prev) => {
        return [...prev, id];
      });
    }
  }

  function resetPath() {
    timeoutIds.forEach((id) => clearTimeout(id));
    setTimeoutIds([]);
    setCells((cells) => {
      return cells.map((row) => {
        return row.map((cell) => {
          return { ...cell, status: undefined };
        });
      });
    });
  }

  function resetAll() {
    resetPath();
    setWalls([]);
    setStart({ x: 0, y: 0 });
    setEnd({ x: m - 1, y: n - 1 });
  }

  function generateWalls() {
    resetPath();
    const randoms = generateRandomsWalls(m, n, 0.3).filter(
      (wall) =>
        (wall.x !== start.x || wall.y !== start.y) &&
        (wall.x !== end.x || wall.y !== end.y)
    );
    setWalls(randoms);
  }

  useEffect(() => {
    if (end.x >= m || end.y >= n) {
      setEnd({ x: m - 1, y: n - 1 });
    }
  }, [end.x, end.y, m, n]);

  return (
    <GraphVisualizerContext.Provider
      value={{
        isMouseDown,
        setIsMouseDown,
        currentCellType,
        setCurrentCellType,
        m,
        n,
        animationSpeed,
        setM,
        setN,
        start,
        setStart,
        end,
        setEnd,
        walls,
        setWalls,
        matrix,
        getType,
        cells,
        setCells,
        resetPath,
        resetAll,
        runDfs,
        runBfs,
        setAnimationSpeed,
        generateWalls,
      }}
    >
      {children}
    </GraphVisualizerContext.Provider>
  );
}

export default GraphVisualizerProvider;
