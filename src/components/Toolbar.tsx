import { useTheme } from '../contexts/ThemeContext';
import { ViewMode } from '../types/maze';

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const Toolbar = ({ viewMode, onViewModeChange }: ToolbarProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'isometric'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => onViewModeChange('isometric')}
          >
            Isometric View
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'orthographic'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => onViewModeChange('orthographic')}
          >
            Orthographic View
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>Isometric View Controls:</p>
        <ul className="list-disc list-inside">
          <li>Click and drag to rotate the maze</li>
          <li>Use mouse wheel to zoom in/out</li>
        </ul>
      </div>
    </div>
  );
};

export default Toolbar; 