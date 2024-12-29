import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type CELL_TYPE = "START" | "END" | "BLANK" | "WALL";

export type STATUS = "VISITED" | "DEAD_END" | "SHORTEST_PATH";

export interface Cell {
  x: number;
  y: number;
  type?: CELL_TYPE;
  status?: STATUS;
}

interface GraphVisualizerContextType {
  m: number;
  n: number;
  animationSpeed: number;
  start: Cell;
  end: Cell;
  setStart: Dispatch<SetStateAction<Cell>>;
  setEnd: Dispatch<SetStateAction<Cell>>;
  walls: Cell[];
  setWalls: Dispatch<SetStateAction<Cell[]>>;
  isMouseDown: boolean;
  setIsMouseDown: Dispatch<SetStateAction<boolean>>;
  setM: Dispatch<SetStateAction<number>>;
  setN: Dispatch<SetStateAction<number>>;
  setAnimationSpeed: Dispatch<SetStateAction<number>>;
  currentCellType: string | null;
  setCurrentCellType: Dispatch<SetStateAction<CELL_TYPE | null>>;
  matrix: number[][];
  getType: (x: number, y: number) => CELL_TYPE;
  cells: Cell[][];
  setCells: Dispatch<SetStateAction<Cell[][]>>;
  runDfs: () => void;
  runBfs: () => void;
  resetPath: () => void;
  resetAll: () => void;
}

export const GraphVisualizerContext =
  createContext<GraphVisualizerContextType | null>(null);

export const useGraphVisualizerContext = () => {
  const context = useContext(GraphVisualizerContext);

  if (!context) {
    throw new Error("Must be used inside GraphVisualizerProvider");
  }

  return context;
};
