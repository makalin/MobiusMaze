import { useEffect, useRef, useState } from 'react'
import { MazeGenerator } from '../utils/mazeGenerator'
import { MazeRenderer } from '../utils/mazeRenderer'
import { Maze, ViewMode } from '../types/maze'
import { useTheme } from '../contexts/ThemeContext'

interface MazeCanvasProps {
  viewMode: ViewMode
}

const MazeCanvas = ({ viewMode }: MazeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [maze, setMaze] = useState<Maze | null>(null)
  const rendererRef = useRef<MazeRenderer | null>(null)
  const { colors } = useTheme()

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize maze generator and renderer
    const generator = new MazeGenerator(5, 5, 3) // 5x5x3 maze
    const newMaze = generator.generate()
    setMaze(newMaze)

    rendererRef.current = new MazeRenderer(canvasRef.current, viewMode, colors)
    rendererRef.current.render(newMaze)

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current && rendererRef.current) {
        rendererRef.current.resize(
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
        )
        if (maze) {
          rendererRef.current.render(maze)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (rendererRef.current && maze) {
      rendererRef.current.updateViewMode(viewMode)
      rendererRef.current.render(maze)
    }
  }, [viewMode, maze])

  useEffect(() => {
    if (rendererRef.current && maze) {
      rendererRef.current.updateColors(colors)
    }
  }, [colors, maze])

  return (
    <div 
      ref={canvasRef} 
      className="w-full h-[600px] bg-white dark:bg-gray-800"
    />
  )
}

export default MazeCanvas 