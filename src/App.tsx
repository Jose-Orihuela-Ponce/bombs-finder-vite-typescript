import './App.css';
import { useState } from 'react';
import Playground from './Playground';

function gridSize(param: number) {
  const GRID_SIZE = param;
  const MATRIX = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => '0')
  );
  const MATCHES = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, +1],
    [+1, +1],
    [+1, 0],
    [+1, -1]
  ];
  for (let i = 0; i < GRID_SIZE; i++) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const cel = Math.floor(Math.random() * GRID_SIZE);
    MATRIX[row][cel] = 'B';
  }

  for (let rowIndex = 0; rowIndex < MATRIX.length; rowIndex++) {
    for (let celIndex = 0; celIndex < MATRIX[rowIndex].length; celIndex++) {
      if (MATRIX[rowIndex][celIndex] === 'B') {
        continue;
      }
      let bombCount = 0;
      for (let i = 0; i < MATCHES.length; i++) {
        if (
          MATRIX[rowIndex + MATCHES[i][0]]?.[celIndex + MATCHES[i][1]] === 'B'
        ) {
          bombCount++;
        }
      }

      MATRIX[rowIndex][celIndex] = `${bombCount}`;
    }
  }
  return { GRID_SIZE, MATRIX };
}

function App() {
  const [difficulty, setDifficulty] = useState(4);
  const [value, setValue] = useState<number>(0);

  return (
    <main className="mt-2">
      <header>
        <h1>Bombs Finder</h1>
        <div className="flex justify-center items-center">
          <span>Difficulty</span>
          <input
            type="number"
            value={value}
            min="2"
            max="8"
            onChange={(e) => {
              setValue(parseInt(e.target.value, 10));
            }}
            className="w-12 text-center m-4"
          />
          <button
            onClick={() => {
              setDifficulty(value);
            }}
            className="px-4"
          >
            Set
          </button>
        </div>
        <p>You can choose the difficulty. The default is 4.</p>
      </header>
      <Playground difficulty={difficulty} gridSize={gridSize} />
    </main>
  );
}

export default App;
