import { IconSettings } from "@tabler/icons-react";
import Button from "../ui/Button";
import { useGraphVisualizerContext } from "./GraphVisualizerContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { useState } from "react";
import classNames from "classnames";

function Control() {
  const {
    runBfs,
    runDfs,
    resetPath,
    resetAll,
    m,
    n,
    animationSpeed,
    setM,
    setN,
    setAnimationSpeed,
    generateWalls,
  } = useGraphVisualizerContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rows, setRows] = useState(m);
  const [cols, setCols] = useState(n);
  const [speed, setSpeed] = useState(animationSpeed);

  function handleApply(e) {
    e.preventDefault();
    setM(Math.min(rows, 20));
    setRows(Math.min(rows, 20));
    setN(Math.min(cols, 20));
    setCols(Math.min(cols, 20));
    setAnimationSpeed(Math.min(speed, 200));
    setSpeed(Math.min(speed, 200));
    setIsDialogOpen(false);
  }

  return (
    <div className="text-white p-4 rounded-lg bg-[#121212] w-full md:w-[300px] flex flex-col gap-4 flex-shrink-0">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold">Controls</h2>
        <Button variant="icon" onClick={() => setIsDialogOpen(true)}>
          <IconSettings />
        </Button>
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/30" />

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-lg w-full">
              <DialogTitle className="font-bold">Board Settings</DialogTitle>
              <div className="flex gap-4">
                <Field className="flex-1">
                  <Label className="text-sm/6 font-medium">Rows (5-20)</Label>
                  <Input
                    name="rows"
                    type="number"
                    value={rows}
                    onChange={(e) => setRows(Number(e.target.value))}
                    min={1}
                    max={20}
                    className={classNames(
                      "mt-3 block w-full rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </Field>
                <Field className="flex-1">
                  <Label className="text-sm/6 font-medium">
                    Columns (5-20)
                  </Label>
                  <Input
                    name="columns"
                    type="number"
                    min={1}
                    max={20}
                    value={cols}
                    onChange={(e) => setCols(Number(e.target.value))}
                    className={classNames(
                      "mt-3 block w-full rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </Field>
              </div>
              <Field className="flex-1">
                <Label className="text-sm/6 font-medium">
                  Animation Speed (20-100ms)
                </Label>
                <Input
                  name="animation_speed"
                  type="number"
                  min={20}
                  max={100}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className={classNames(
                    "mt-3 block w-full rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </Field>
              <div className="flex gap-4">
                <Button variant="danger" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleApply} type="submit">
                  Apply
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
      <div className="flex flex-col gap-4">
        <Button onClick={runDfs} variant="primary">
          Depth-First Search
        </Button>
        <Button onClick={runBfs} variant="primary">
          Breadth-First Search
        </Button>

        <div className="h-[1px] border-b border-b-gray-600"></div>

        <Button onClick={generateWalls} variant="danger" className="flex-1">
          Generate Walls
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
