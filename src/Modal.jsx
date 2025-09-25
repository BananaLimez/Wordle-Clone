import React from 'react';

function Modal({ onNextRound, solution }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-xl mb-4">Game Over!</h2>
        {solution && (
          <p className="mb-4">
            The word was:{' '}
            <span className="font-mono font-bold">{solution}</span>
          </p>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onNextRound}
        >
          Next Word
        </button>
      </div>
    </div>
  );
}

export default Modal;