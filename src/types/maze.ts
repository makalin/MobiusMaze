export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface Cell {
  id: string;
  position: Point;
  walls: {
    north: boolean;
    south: boolean;
    east: boolean;
    west: boolean;
    up: boolean;
    down: boolean;
  };
  connections: string[]; // IDs of connected cells
}

export interface Maze {
  id: string;
  cells: Cell[];
  start: string; // Cell ID
  end: string; // Cell ID
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

export type ViewMode = 'isometric' | 'orthographic'; 