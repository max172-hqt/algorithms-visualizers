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
} from "./GraphVisualizerContext";
import dfs from "../algorithms/dfs";
import { isValid } from "../algorithms/helpers";
import bfs from "../algorithms/bfs";

function GraphVisualizerProvider({ children }: PropsWithChildren) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentCellType, setCurrentCellType] = useState<CELL_TYPE | null>(
    null
  );
  const [m] = useState(15);
  const [n] = useState(15);
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

  function runAnimation() {
    resetPath();

    const animations = bfs(matrix, start, end);

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
      }, i * 20);

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
  }

  return (
    <GraphVisualizerContext.Provider
      value={{
        isMouseDown,
        setIsMouseDown,
        currentCellType,
        setCurrentCellType,
        m,
        n,
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
        runAnimation,
      }}
    >
      {children}
    </GraphVisualizerContext.Provider>
  );
}

export default GraphVisualizerProvider;
