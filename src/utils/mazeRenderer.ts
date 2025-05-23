import * as d3 from 'd3';
import { Maze, ViewMode } from '../types/maze';
import { ThemeColors } from '../types/theme';

export class MazeRenderer {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private width: number;
  private height: number;
  private cellSize: number = 30;
  private isometricAngle: number = 30;
  private rotation: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };
  private zoom: number = 1;
  private colors: ThemeColors;

  constructor(
    container: HTMLElement,
    private viewMode: ViewMode,
    colors: ThemeColors
  ) {
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.colors = colors;

    // Create SVG with zoom behavior
    this.svg = d3.select(container)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        this.zoom = event.transform.k;
        this.render(this.currentMaze!);
      });

    this.svg.call(zoom);

    // Add drag behavior for rotation
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    this.svg
      .on('mousedown', (event) => {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
      })
      .on('mousemove', (event) => {
        if (isDragging && this.viewMode === 'isometric') {
          const dx = event.clientX - startX;
          const dy = event.clientY - startY;
          this.rotation.y += dx * 0.5;
          this.rotation.x += dy * 0.5;
          this.render(this.currentMaze!);
          startX = event.clientX;
          startY = event.clientY;
        }
      })
      .on('mouseup', () => {
        isDragging = false;
      })
      .on('mouseleave', () => {
        isDragging = false;
      });
  }

  private currentMaze: Maze | null = null;

  private getCellPosition(cell: { position: { x: number; y: number; z: number } }) {
    const { x, y, z } = cell.position;
    
    if (this.viewMode === 'isometric') {
      // Apply 3D rotation
      const cosX = Math.cos(this.rotation.x * Math.PI / 180);
      const sinX = Math.sin(this.rotation.x * Math.PI / 180);
      const cosY = Math.cos(this.rotation.y * Math.PI / 180);
      const sinY = Math.sin(this.rotation.y * Math.PI / 180);

      // Rotate around Y axis
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;

      // Rotate around X axis
      let y1 = y * cosX - z1 * sinX;
      z1 = y * sinX + z1 * cosX;

      // Apply isometric projection
      const isoX = (x1 - y1) * Math.cos(this.isometricAngle * Math.PI / 180) * this.cellSize;
      const isoY = (x1 + y1) * Math.sin(this.isometricAngle * Math.PI / 180) * this.cellSize - z1 * this.cellSize;

      // Apply zoom
      return {
        x: isoX * this.zoom + this.width / 2,
        y: isoY * this.zoom + this.height / 2
      };
    } else {
      // Orthographic projection with zoom
      return {
        x: x * this.cellSize * this.zoom + this.width / 2,
        y: y * this.cellSize * this.zoom + this.height / 2
      };
    }
  }

  private drawWall(
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) {
    this.svg.append('line')
      .attr('x1', start.x)
      .attr('y1', start.y)
      .attr('x2', end.x)
      .attr('y2', end.y)
      .attr('stroke', this.colors.wall)
      .attr('stroke-width', 2);
  }

  render(maze: Maze) {
    this.currentMaze = maze;
    
    // Clear previous render
    this.svg.selectAll('*').remove();

    // Draw cells and walls
    maze.cells.forEach(cell => {
      const pos = this.getCellPosition(cell);
      const halfSize = this.cellSize * this.zoom / 2;

      // Draw cell center point
      this.svg.append('circle')
        .attr('cx', pos.x)
        .attr('cy', pos.y)
        .attr('r', 2)
        .attr('fill', this.colors.cell);

      // Draw walls
      if (cell.walls.north) {
        this.drawWall(
          { x: pos.x - halfSize, y: pos.y - halfSize },
          { x: pos.x + halfSize, y: pos.y - halfSize }
        );
      }
      if (cell.walls.south) {
        this.drawWall(
          { x: pos.x - halfSize, y: pos.y + halfSize },
          { x: pos.x + halfSize, y: pos.y + halfSize }
        );
      }
      if (cell.walls.east) {
        this.drawWall(
          { x: pos.x + halfSize, y: pos.y - halfSize },
          { x: pos.x + halfSize, y: pos.y + halfSize }
        );
      }
      if (cell.walls.west) {
        this.drawWall(
          { x: pos.x - halfSize, y: pos.y - halfSize },
          { x: pos.x - halfSize, y: pos.y + halfSize }
        );
      }

      // Draw start and end points
      if (cell.id === maze.start) {
        this.svg.append('circle')
          .attr('cx', pos.x)
          .attr('cy', pos.y)
          .attr('r', 5)
          .attr('fill', this.colors.start);
      }
      if (cell.id === maze.end) {
        this.svg.append('circle')
          .attr('cx', pos.x)
          .attr('cy', pos.y)
          .attr('r', 5)
          .attr('fill', this.colors.end);
      }
    });
  }

  updateViewMode(viewMode: ViewMode) {
    this.viewMode = viewMode;
    this.rotation = { x: 0, y: 0, z: 0 };
    if (this.currentMaze) {
      this.render(this.currentMaze);
    }
  }

  updateColors(colors: ThemeColors) {
    this.colors = colors;
    if (this.currentMaze) {
      this.render(this.currentMaze);
    }
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.svg
      .attr('width', width)
      .attr('height', height);
    if (this.currentMaze) {
      this.render(this.currentMaze);
    }
  }
} 