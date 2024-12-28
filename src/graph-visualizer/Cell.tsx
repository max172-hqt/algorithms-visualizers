import classNames from "classnames";
import { type Cell, useGraphVisualizerContext } from "./GraphVisualizerContext";
import { IconPennant2 } from "@tabler/icons-react";

interface CellProps {
  cell: Cell;
}

function Cell({ cell }: CellProps) {
  const {
    start,
    end,
    isMouseDown,
    currentCellType,
    setStart,
    setEnd,
    setIsMouseDown,
    setCurrentCellType,
    setWalls,
  } = useGraphVisualizerContext();

  if (!cell) return;

  const { x, y, type, status } = cell;

  function handleOnMouseDown(x: number, y: number) {
    setIsMouseDown(true);
    if (x === start.x && y === start.y) {
      setCurrentCellType("START");
    } else if (x === end.x && y === end.y) {
      setCurrentCellType("END");
    } else {
      setCurrentCellType("WALL");
      setWalls((prev) => [...prev, { x, y }]);
    }
  }

  function handleMouseUp() {
    setIsMouseDown(false);
    setCurrentCellType(null);
  }

  function handleMouseOver(
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number
  ) {
    if (e.buttons !== 1) {
      setIsMouseDown(false);
      return;
    }

    if (!isMouseDown) {
      return;
    }

    if (currentCellType === "START") {
      setStart({ x, y });
    } else if (currentCellType === "END") {
      setEnd({ x, y });
    } else {
      setWalls((prev) => [...prev, { x, y }]);
    }
  }

  return (
    <div
      key={`${x}-${y}`}
      id={`${x}-${y}`}
      onMouseDown={() => handleOnMouseDown(x, y)}
      onMouseUp={handleMouseUp}
      onMouseOver={(e: React.MouseEvent<HTMLDivElement>) =>
        handleMouseOver(e, x, y)
      }
      className={classNames(
        "cell w-8 h-8 border border-gray-400 inline-flex items-center justify-center",
        {
          "bg-red-500": type === "WALL",
          "bg-green-500": type === "START",
          "bg-amber-500": type === "END",
          "bg-red-200": status === "DEAD_END" && type !== 'END' && type !== 'START',
          "bg-yellow-500": status === "VISITED" && type !== 'END' && type !== 'START',
        }
      )}
    >{status === "VISITED" && type === 'END' && <IconPennant2 />}</div>
  );
}

export default Cell;
