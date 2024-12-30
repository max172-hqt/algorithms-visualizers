import { useGraphVisualizerContext } from "./GraphVisualizerContext";
import Cell from "./Cell";
import { IconExclamationCircleFilled } from "@tabler/icons-react";

const Legend = () => (
  <div className="flex flex-row xl:flex-col gap-4 flex-wrap">
    <div className="flex gap-2 items-center">
      <div className="flex-shrink-0 h-6 w-6 bg-blue-500"></div>
      <p>Start</p>
    </div>
    <div className="flex gap-2 items-center">
      <div className="flex-shrink-0 h-6 w-6 bg-green-500"></div>
      <p>End</p>
    </div>
    <div className="flex gap-2 items-center">
      <div className="flex-shrink-0 h-6 w-6 bg-red-500"></div>
      <p>Wall</p>
    </div>
    <div className="flex gap-2 items-center">
      <div className="flex-shrink-0 h-6 w-6 bg-orange-200"></div>
      <p>Visited</p>
    </div>
    <div className="flex gap-2 items-center">
      <div className="flex-shrink-0 h-6 w-6 bg-red-300"></div>
      <p>Dead End (DFS)</p>
    </div>
    <div className="flex gap-2 items-center">
      <div className="flex-shrink-0 h-6 w-6 bg-orange-500"></div>
      <p>Shortest Path (BFS)</p>
    </div>
  </div>
);

function Board() {
  const { matrix, cells, m, n } = useGraphVisualizerContext();

  return (
    <div className="flex-1 flex xl:flex-row flex-col gap-8 justify-center items-center p-4 bg-[#121212] rounded-lg text-white text-sm w-full overflow-hidden">
      <div
        className="grid gap-1 bg-[#1f1f1f] p-4 rounded-lg flex-shrink-0"
        style={{
          gridTemplateRows: `repeat(${m}, minmax(0fr, 1fr))`,
          gridTemplateColumns: `repeat(${n}, 1fr`,
        }}
      >
        {matrix.map((row, i) => {
          return row.map((_, j) => {
            return <Cell cell={cells?.[i]?.[j]} key={`${i}-${j}`} />;
          });
        })}
      </div>
      <div className="flex gap-4 flex-col self-start md:self-center">
        <Legend />
        <hr />
        <p className="inline-flex gap-2 items-center">
          <IconExclamationCircleFilled /> Drag start or end cell to change
          position.
        </p>
        <p className="inline-flex gap-2 items-center">
          <IconExclamationCircleFilled /> Click or drag blank cells to generate
          walls.
        </p>
        <p className="inline-flex gap-2 items-center">
          <IconExclamationCircleFilled /> Click or drag wall cells to remove
          walls.
        </p>
      </div>
    </div>
  );
}

export default Board;
