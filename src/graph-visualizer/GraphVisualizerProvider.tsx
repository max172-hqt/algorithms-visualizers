import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import {
  type Cell,
  type CELL_TYPE,
  GraphVisualizerContext,
} from "./GraphVisualizerContext";
import { isValid } from "../algorithms/dfs";

function GraphVisualizerProvider({ children }: PropsWithChildren) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentCellType, setCurrentCellType] = useState<CELL_TYPE | null>(
    null
  );
  const [m] = useState(15);
  const [n] = useState(10);
  const [start, setStart] = useState<Cell>({ x: 0, y: 0 });
  const [end, setEnd] = useState<Cell>({ x: 7, y: 7 });
  const [walls, setWalls] = useState<Cell[]>([]);
  const [cells, setCells] = useState<Cell[][]>([]);

  const matrix = useMemo(() => {
    const res = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (const { x, y } of walls) {
      if (isValid(x, y, m, n)) {
        res[x][y] = 1;
      }
    }
    return res;
  }, [m, n, walls]);

  const getType = useCallback((x: number, y: number) => {
    if (x === start.x && y === start.y) {
      return "START";
    } else if (x === end.x && y === end.y) {
      return "END";
    } else if (matrix[x][y] === 1) {
      return "WALL";
    }
    return "BLANK";
  }, [end.x, end.y, matrix, start.x, start.y])

  useEffect(() => {
    const res = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        res[i][j] = {
          x: i, y: j, type: getType(i, j)
        }
      }
    }
    console.log(res)
    setCells(res);
  }, [getType, m, n])

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
        setCells
      }}
    >
      {children}
    </GraphVisualizerContext.Provider>
  );
}

export default GraphVisualizerProvider;
