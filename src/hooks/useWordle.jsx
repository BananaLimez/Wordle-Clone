import React, { useState } from 'react'


function useWordle(solution) {
    const [turn,setTurn] = useState(0) //what turn in worlde if 6 turn -game over
    const [currentGuess, setCurrentGuess] = useState('') //what user currently typing
    const [guesses, setGuesses] = useState([...Array(6)]) //store user past guesses format n color
    const [history, setHistory] = useState([]) //also store but to compare so no duplicate
    const [isCorrect, setIsCorrect] = useState(false) //change to truw when win
    const [usedKeys, setUsedKeys] = useState({}) //{a: 'green', b: 'yellow', c: 'grey'}
    const [validWord, setValidWord] = useState(true) //to check if word is valid

    //format a guess into an array of letter objects
    //exp [{key: 'a}, color: 'yellow]

    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l)=>{
            return {key: l, color: 'grey'}
        })

        //find any green letter
        formattedGuess.forEach((l, i)=>{
            if(solutionArray[i] == l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null;
            }
        })

        //piped, plans

        //find any yellow colors
        formattedGuess.forEach((l, i)=>{
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        })

        return formattedGuess;
    }

    //add a new gues to guess state
    //update the isCorrect if guess is correct
    //add one to the turn state
    const addNewGuess = (formattedGuess) => {

        //win game if the word we entered === solution
        if(currentGuess === solution){
            setIsCorrect(true)
        }

        //we set our guess
        setGuesses((prevGuesses)=>{
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })

        setHistory((prevHistory)=>{
            return [...prevHistory, currentGuess]
        })

        setTurn((prevTurn)=>{
            return prevTurn + 1
        })

        setUsedKeys((prevUsedKeys)=>{
            let newKeys = {...prevUsedKeys}
            formattedGuess.forEach((l)=>{
                const currentColor = newKeys[l.key] //check if we already have a color for that letter
                if(l.color === 'green'){
                    newKeys[l.key] = 'green'
                    return
                }
                if(l.color === 'yellow' && currentColor !== 'green'){
                    newKeys[l.key] = 'yellow'
                    return
                }
                if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
                    newKeys[l.key] = 'grey'
                    return
                }
            })

            return newKeys;
        })

        setCurrentGuess('') //reset current guess
    }

    // handle keyupevent & track current guess
    // if use press enter, add new guess
    const handleKeyup = async ({key}) => {
        if(key === 'Enter'){

            //only add dd guess if turn less than 5
            if(turn > 5){
                console.log('you');
                return;
            }

            // don't allow duplicate words
            if(history.includes(currentGuess)){
                console.log('you already tried that word');
                return;
            }

            //check word is 5 chars long
            if(currentGuess.length !== 5){
                console.log('word must be 5 chars long');
                return;
            }

            // Check if word is valid using dictionary API
            setValidWord(true); // Reset validWord state
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuess.toLowerCase()}`);
                if (!res.ok) {
                    console.log('Not a valid English word');
                    setValidWord(false);
                    return;
                }
            } catch (error) {
                console.log('Error checking word:', error);
                return;
            }

           const formatted = formatGuess();
           addNewGuess(formatted);
        }


        //remove last character
        if(key === 'Backspace'){
            setCurrentGuess((prev)=>{
                return prev.slice(0, -1)
            })
        }

        // regex to check the key we press A-Z a-z
        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length <5){
                //we set guess based on the prev key + current press key
                setCurrentGuess((prev)=>{
                    return prev + key
                })
            }
        
        }
    }
 

    return {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys, validWord}
}   

export default useWordle