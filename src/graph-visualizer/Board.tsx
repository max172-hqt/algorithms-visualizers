import dfs from "../algorithms/dfs";
import { useState } from "react";
import { useGraphVisualizerContext } from "./GraphVisualizerContext";
import Cell from "./Cell";

function Board() {
  const { start, end, matrix, cells, setCells, m, n } =
    useGraphVisualizerContext();

  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  function runAnimation() {
    reset();

    const animations = dfs(matrix, start, end);

    for (let i = 0; i < animations.length; i++) {
      const { x, y } = animations[i].point;
      const status = animations[i].status;
      const id = setTimeout(() => {
        setCells((cells) => {
          return cells.map((row, i) => {
            return row.map((cell, j) => {
              if (x === i && y === j) {
                return { ...cell, status };
              } else {
                return cell;
              }
            });
          });
        });
      }, i * 20);

      setTimeoutIds((prev) => {
        return [...prev, id];
      });
    }
  }

  function reset() {
    timeoutIds.forEach((id) => clearTimeout(id));
    setTimeoutIds([]);
    setCells((cells) => {
      return cells.map((row) => {
        return row.map((cell) => {
          return { ...cell, status: undefined}
        });
      });
    });
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <button onClick={runAnimation}>Start</button>
      <div
        className="grid gap-1"
        style={{
          gridTemplateRows: `repeat(${m}, 1fr)`,
          gridTemplateColumns: `repeat(${n}, 1fr)`,
        }}
      >
        {matrix.map((row, i) => {
          return row.map((_, j) => {
            return <Cell cell={cells?.[i]?.[j]} key={`${i}-${j}`} />;
          });
        })}
      </div>
    </div>
  );
}

export default Board;
