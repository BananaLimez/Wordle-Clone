//this is the ui for everything
import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'

function Wordle({ solution, onGameEnd }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, validWord } = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    // Call onGameEnd when game is over
    useEffect(() => {
        if (isCorrect || turn > 5) {
            onGameEnd();
        }
    }, [isCorrect, turn, onGameEnd])

    return (
        <div className='w-[100%] justify-center items-center flex flex-col'>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            {!validWord && (
                <div className="text-red-500 mt-2 font-bold">
                    Not a valid English word!
                </div>
            )}
            <Keypad usedKeys={usedKeys} />
        </div>
    )
}
export default Wordle