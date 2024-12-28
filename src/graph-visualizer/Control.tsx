import { IconSettings } from "@tabler/icons-react";
import Button from "../ui/Button";
import { useGraphVisualizerContext } from "./GraphVisualizerContext";

function Control() {
  const { runAnimation, resetPath, resetAll } = useGraphVisualizerContext();

  return (
    <div className="text-white p-4 rounded-lg bg-[#121212] w-[300px] flex flex-col gap-4 flex-shrink-0">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold">Controls</h2>
        <Button variant="icon">
          <IconSettings />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button onClick={runAnimation} variant="primary">
          Depth-First Search
        </Button>

        <div className="flex gap-2 items-center">
          <Button onClick={resetPath} variant="danger" className="flex-1">
            Reset Path
          </Button>
          <Button onClick={resetAll} variant="danger" className="flex-1">
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Control;
