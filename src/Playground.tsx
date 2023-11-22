import { useState, useMemo } from 'react';
import './App.css';

interface GridSize {
  MATRIX: string[][];
  GRID_SIZE: number;
}
function Playground({
  difficulty,
  gridSize
}: {
  difficulty: number;
  gridSize: (a: number) => GridSize;
}) {
  const { MATRIX, GRID_SIZE } = useMemo(
    () => gridSize(difficulty),
    [difficulty]
  );
  const clickedCels: string[] = [];
  const [clicked, setClicked] = useState(clickedCels);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  function handleclick({
    rowIndex,
    cellIndex
  }: {
    rowIndex: number;
    cellIndex: number;
  }) {
    const id = `${rowIndex}-${cellIndex}`;
    setClicked((clickedCels) => [...clickedCels, id]);

    if (MATRIX[rowIndex][cellIndex] === 'B') {
      setStatus('lost');
    } else if (clicked.length + 1 == GRID_SIZE * (GRID_SIZE - 1)) {
      setStatus('won');
    }

    console.log(clicked);
  }
  return (
    <section className="container m-aut grid-rows-[100px,1fr,100px] px-4">
      <section className="flex flex-col py-8 items-center">
        {MATRIX.map((row, rowIndex) => (
          <article key={rowIndex} className="flex">
            {row.map((cel, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className="h-10 w-10 border-2 flex border-black"
              >
                {status !== 'playing' && status !== 'won' ? (
                  <button className="h-full w-full bg-red-600">
                    {cel === 'B' ? '🎃' : cel == '0' ? null : cel}
                  </button>
                ) : clicked.includes(`${rowIndex}-${cellIndex}`) ? (
                  <span className="bg-white text-black text-lg h-full w-full flex justify-center items-center">
                    {cel === 'B' ? '🎃' : cel == '0' ? null : cel}
                  </span>
                ) : (
                  <button
                    onClick={() => handleclick({ rowIndex, cellIndex })}
                    className="h-full w-full"
                  >
                    {/* espacio vacio */}
                  </button>
                )}
              </div>
            ))}
          </article>
        ))}
      </section>
      <footer className="h-[200px]">
        <article>
          {status == 'playing' ? 'Playing' : status == 'won' ? 'Won' : 'Lost'}
        </article>
        {status !== 'playing' && status !== 'won' ? (
          <button
            className="px-4 mt-2"
            onClick={() => window.location.reload()}
          >
            Play again
          </button>
        ) : (
          ''
        )}
      </footer>
    </section>
  );
}

export default Playground;
