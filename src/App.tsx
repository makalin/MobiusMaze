import { useState } from 'react'
import MazeCanvas from './components/MazeCanvas'
import Toolbar from './components/Toolbar'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'

function App() {
  const [viewMode, setViewMode] = useState<'isometric' | 'orthographic'>('isometric')

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">MobiusMaze 🌀</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Toolbar viewMode={viewMode} onViewModeChange={setViewMode} />
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <MazeCanvas viewMode={viewMode} />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App 