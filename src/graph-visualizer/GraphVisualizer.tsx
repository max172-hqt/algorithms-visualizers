import classNames from "classnames";
import dfs from "../algorithms/dfs";
import { useMemo, useState } from "react";

function GraphVisualizer() {
  const matrix = useMemo(
    () => [
      [0, 1, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
    ],
    []
  );

  const start = useMemo(() => [4, 0], []);
  const end = useMemo(() => [4, 7], []);
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  function runAnimation() {
    reset();

    const animations = dfs(matrix, start, end);

    for (let i = 0; i < animations.length; i++) {
      const [x, y] = animations[i].point;
      const status = animations[i].status;
      const id = setTimeout(() => {
        const el = document.getElementById(`${x}-${y}`);

        if (status === "inpath") {
          el?.classList.add("bg-yellow-300");
        } else {
          el?.classList.add("bg-red-200");
        }
      }, i * 100);

      setTimeoutIds((prev) => {
        return [...prev, id];
      });
    }
  }

  function reset() {
    timeoutIds.forEach((id) => clearTimeout(id));
    setTimeoutIds([]);
    const els = document.querySelectorAll(".cell");
    els.forEach((el) => el.classList.remove("bg-yellow-300"));
    els.forEach((el) => el.classList.remove("bg-red-200"));
  }

  return (
    <>
      <div className="flex items-center flex-col gap-1 m-4">
        {matrix.map((row, i) => (
          <div className="flex items-center flex-row gap-1" key={i}>
            {row.map((item, j) => (
              <div
                key={j}
                id={`${i}-${j}`}
                className={classNames(
                  "cell w-8 h-8 border inline-flex items-center justify-center",
                  {
                    "bg-red-500": item === 1,
                    "bg-green-500": i === start[0] && j === start[1],
                    "bg-amber-500": i === end[0] && j === end[1],
                  }
                )}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={runAnimation}>Run</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default GraphVisualizer;
