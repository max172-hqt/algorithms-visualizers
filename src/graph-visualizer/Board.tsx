import { useGraphVisualizerContext } from "./GraphVisualizerContext";
import Cell from "./Cell";

function Board() {
  const { matrix, cells, m, n } =
    useGraphVisualizerContext();

  return (
    <div className="flex-1 flex justify-center items-center p-4 bg-[#121212] rounded-lg">
      <div
        className="grid gap-1 bg-[#1f1f1f] p-8 rounded-lg"
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
