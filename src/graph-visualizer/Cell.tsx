import classNames from "classnames";
import { type Cell, useGraphVisualizerContext } from "./GraphVisualizerContext";

interface CellProps {
  cell: Cell;
}

function Cell({ cell }: CellProps) {
  const {
    isMouseDown,
    currentCellType,
    setStart,
    setEnd,
    setIsMouseDown,
    setCurrentCellType,
    setWalls,
    getType,
  } = useGraphVisualizerContext();

  if (!cell) return;

  const { x, y, type, status } = cell;

  function handleOnMouseDown(x: number, y: number) {
    setIsMouseDown(true);
    const type = getType(x, y);
    setCurrentCellType(type);
    if (type === "BLANK") {
      setWalls((prev) => [...prev, { x, y }]);
    } else if (type === 'WALL') {
      setWalls(prev => prev.filter(cell => cell.x !== x || cell.y !== y))
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
      // left click
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
    } else if (currentCellType === 'BLANK') {
      setWalls((prev) => [...prev, { x, y }]);
    } else {
      setWalls((prev) => prev.filter(cell => cell.x !== x || cell.y !== y));
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
        "cell flex-grow border flex-shrink-0 w-full h-full aspect-square min-w-4 md:min-w-6 lg:min-w-8 border-gray-400 inline-flex items-center justify-center",
        {
          "bg-red-500": type === "WALL",
          "bg-blue-500": type === "START",
          "bg-green-500": type === "END",
          "bg-red-300 transition-colors ":
            status === "DEAD_END" && type !== "END" && type !== "START",
          "bg-orange-200 transition-colors ":
            status === "VISITED" && type !== "END" && type !== "START",
          "bg-orange-500 transition-colors ":
            status === "SHORTEST_PATH" && type !== "END" && type !== "START",
        }
      )}
    >
      {/* {status === "VISITED" && type === "END" && <IconPennant2 />} */}
    </div>
  );
}

export default Cell;
