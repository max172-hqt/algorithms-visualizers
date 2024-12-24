import classNames from "classnames";

function GraphVisualizer() {
  const matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const start = [0, 0];
  const end = [4, 7]; 

  return (
    <div className="flex items-center flex-col gap-2 m-4">
      {matrix.map((row, i) => (
        <div className="flex items-center flex-row gap-2">
          {row.map((item, j) => (
            <div className={classNames("w-8 h-8 border inline-flex items-center justify-center", {
              'bg-red-500': item === 1,
              'bg-green-500': i === start[0] && j === start[1],
              'bg-amber-500': i === end[0] && j === end[1],
            })}>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GraphVisualizer;
