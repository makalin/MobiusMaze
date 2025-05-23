# MobiusMaze 🌀  
*Escher-style maze generator with recursive, mind-bending geometry.*

![MobiusMaze Banner](https://yourdomain.com/assets/banner.png)

## 🎨 What is MobiusMaze?

**MobiusMaze** is a web-based tool to create and explore Escher-inspired mazes. These aren't your average mazes — they bend logic, loop back on themselves, and challenge your perception of space. Inspired by impossible shapes, Penrose stairs, and Möbius strips, MobiusMaze is both a generative art project and an interactive puzzle engine.

## ✨ Features

- 🧩 **3D Maze Generation** — Recursive depth-first search algorithm for maze generation
- 🎛️ **Dual View Modes** — Switch between isometric and orthographic projections
- 🧠 **3D Navigation** — Explore mazes in three dimensions
- 🎨 **Interactive Rendering** — Real-time maze visualization using D3.js
- 🌐 **Responsive Design** — Adapts to any screen size
- ⚙️ **TypeScript Support** — Full type safety and modern development experience
- 💾 **State Management** — React hooks for maze state and view mode
- 📱 **Mobile-Friendly** — Touch-friendly interface

## 🛠 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Visualization:** D3.js
- **Code Quality:** ESLint + TypeScript ESLint
- **Development:** Hot Module Replacement (HMR)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/makalin/MobiusMaze.git
cd MobiusMaze
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to start exploring mazes.

## 📦 Project Structure

```
MobiusMaze/
├── src/
│   ├── components/          # React components
│   │   ├── MazeCanvas.tsx   # Main maze rendering component
│   │   └── Toolbar.tsx      # View mode controls
│   ├── types/              # TypeScript type definitions
│   │   └── maze.ts         # Maze-related types
│   ├── utils/              # Utility functions
│   │   ├── mazeGenerator.ts # Maze generation algorithm
│   │   └── mazeRenderer.ts  # D3.js rendering logic
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
│   └── mobius.svg          # Application icon
├── index.html             # HTML entry point
└── package.json           # Project configuration
```

## 🎮 Usage

1. **View Modes**
   - Toggle between isometric and orthographic views using the toolbar
   - Isometric view provides a 3D perspective
   - Orthographic view shows a top-down 2D representation

2. **Maze Navigation**
   - Start point is marked in green
   - End point is marked in red
   - Walls are rendered as black lines
   - Cell centers are marked with small gray dots

3. **Maze Generation**
   - Currently generates a 5x5x3 maze
   - Uses depth-first search for maze generation
   - Automatically finds the longest path for start/end points

## 🧠 Implementation Details

### Maze Generation
- Uses a depth-first search algorithm
- Supports 3D maze generation with customizable dimensions
- Maintains wall and connection information for each cell
- Automatically finds the longest path for start/end points

### Rendering
- D3.js for SVG-based rendering
- Supports both isometric and orthographic projections
- Responsive design with automatic resizing
- Efficient rendering with minimal DOM updates

## 🧑‍🎨 Created by

Mehmet T. AKALIN
[github.com/makalin](https://github.com/makalin)

## 🌀 License

MIT License
