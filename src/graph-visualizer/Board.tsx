import dfs, { STATUS } from "../algorithms/dfs";
import { useState } from "react";
import { useGraphVisualizerContext } from "./GraphVisualizerContext";
import Cell from "./Cell";

function Board() {
  const { start, end, matrix, getType, m, n } = useGraphVisualizerContext();

  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  function runAnimation() {
    reset();

    const animations = dfs(matrix, start, end);

    for (let i = 0; i < animations.length; i++) {
      const { x, y } = animations[i].point;
      const status = animations[i].status;
      const id = setTimeout(() => {
        const el = document.getElementById(`${x}-${y}`);

        if (!el) return;

        if (status === STATUS.VISITED) {
          el.classList.add("bg-yellow-300");
        } else {
          el.classList.add("bg-red-200");
        }
      }, i * 20);

      setTimeoutIds((prev) => {
        return [...prev, id];
      });
    }
  }

  function reset() {
    timeoutIds.forEach((id) => clearTimeout(id));
    setTimeoutIds([]);
    const els = document.querySelectorAll(".cell");
    els.forEach((el) => {
      el.classList.remove("bg-yellow-300");
      el.classList.remove("bg-red-200");
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
            return (
              <Cell
                cell={{
                  x: i,
                  y: j,
                  type: getType(i, j),
                }}
                key={`${i}-${j}`}
              />
            );
          });
        })}
      </div>
    </div>
  );
}

export default Board;
