import { type PropsWithChildren, useMemo, useState } from "react";
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

  const matrix = useMemo(() => {
    const res = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (const { x, y } of walls) {
      if (isValid(x, y, m, n)) {
        res[x][y] = 1;
      }
    }
    return res;
  }, [m, n, walls]);

  function getType(x: number, y: number) {
    if (x === start.x && y === start.y) {
      return "START";
    } else if (x === end.x && y === end.y) {
      return "END";
    } else if (matrix[x][y] === 1) {
      return "WALL";
    }
    return "BLANK";
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
      }}
    >
      {children}
    </GraphVisualizerContext.Provider>
  );
}

export default GraphVisualizerProvider;
