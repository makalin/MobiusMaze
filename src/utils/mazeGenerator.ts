import { Cell, Maze, Point } from '../types/maze';

export class MazeGenerator {
  private cells: Cell[] = [];
  private visited: Set<string> = new Set();

  constructor(
    private width: number,
    private height: number,
    private depth: number
  ) {}

  private createCell(x: number, y: number, z: number): Cell {
    return {
      id: `${x}-${y}-${z}`,
      position: { x, y, z },
      walls: {
        north: true,
        south: true,
        east: true,
        west: true,
        up: true,
        down: true,
      },
      connections: [],
    };
  }

  private getNeighbors(cell: Cell): Cell[] {
    const { x, y, z } = cell.position;
    const neighbors: Cell[] = [];

    // Get all possible neighbors
    if (x > 0) neighbors.push(this.cells.find(c => c.position.x === x - 1 && c.position.y === y && c.position.z === z)!);
    if (x < this.width - 1) neighbors.push(this.cells.find(c => c.position.x === x + 1 && c.position.y === y && c.position.z === z)!);
    if (y > 0) neighbors.push(this.cells.find(c => c.position.x === x && c.position.y === y - 1 && c.position.z === z)!);
    if (y < this.height - 1) neighbors.push(this.cells.find(c => c.position.x === x && c.position.y === y + 1 && c.position.z === z)!);
    if (z > 0) neighbors.push(this.cells.find(c => c.position.x === x && c.position.y === y && c.position.z === z - 1)!);
    if (z < this.depth - 1) neighbors.push(this.cells.find(c => c.position.x === x && c.position.y === y && c.position.z === z + 1)!);

    return neighbors.filter(Boolean) as Cell[];
  }

  private removeWall(cell1: Cell, cell2: Cell) {
    const { x: x1, y: y1, z: z1 } = cell1.position;
    const { x: x2, y: y2, z: z2 } = cell2.position;

    if (x1 < x2) {
      cell1.walls.east = false;
      cell2.walls.west = false;
    } else if (x1 > x2) {
      cell1.walls.west = false;
      cell2.walls.east = false;
    }

    if (y1 < y2) {
      cell1.walls.south = false;
      cell2.walls.north = false;
    } else if (y1 > y2) {
      cell1.walls.north = false;
      cell2.walls.south = false;
    }

    if (z1 < z2) {
      cell1.walls.up = false;
      cell2.walls.down = false;
    } else if (z1 > z2) {
      cell1.walls.down = false;
      cell2.walls.up = false;
    }

    cell1.connections.push(cell2.id);
    cell2.connections.push(cell1.id);
  }

  private dfs(cell: Cell) {
    this.visited.add(cell.id);
    const neighbors = this.getNeighbors(cell);

    // Shuffle neighbors for random maze generation
    for (let i = neighbors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
    }

    for (const neighbor of neighbors) {
      if (!this.visited.has(neighbor.id)) {
        this.removeWall(cell, neighbor);
        this.dfs(neighbor);
      }
    }
  }

  generate(): Maze {
    // Initialize cells
    this.cells = [];
    for (let z = 0; z < this.depth; z++) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          this.cells.push(this.createCell(x, y, z));
        }
      }
    }

    // Reset visited set
    this.visited.clear();

    // Start DFS from a random cell
    const startCell = this.cells[Math.floor(Math.random() * this.cells.length)];
    this.dfs(startCell);

    // Find the furthest cell from start for end point
    const endCell = this.findFurthestCell(startCell);

    return {
      id: Date.now().toString(),
      cells: this.cells,
      start: startCell.id,
      end: endCell.id,
      dimensions: {
        width: this.width,
        height: this.height,
        depth: this.depth,
      },
    };
  }

  private findFurthestCell(startCell: Cell): Cell {
    const distances = new Map<string, number>();
    const queue: Cell[] = [startCell];
    distances.set(startCell.id, 0);
    let furthestCell = startCell;
    let maxDistance = 0;

    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentDistance = distances.get(current.id)!;

      for (const neighborId of current.connections) {
        if (!distances.has(neighborId)) {
          const neighbor = this.cells.find(c => c.id === neighborId)!;
          const newDistance = currentDistance + 1;
          distances.set(neighborId, newDistance);
          queue.push(neighbor);

          if (newDistance > maxDistance) {
            maxDistance = newDistance;
            furthestCell = neighbor;
          }
        }
      }
    }

    return furthestCell;
  }
} 