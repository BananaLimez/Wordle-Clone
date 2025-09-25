import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import Modal from "./Modal"; // create this component


function App() {
  const [word, setWord] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [round, setRound] = useState(0);

  const fetchWord = async () => {
    let validWord = null;
    while (!validWord) {
      try {
        // 1. Get a random word
        const res = await fetch("https://random-word-api.herokuapp.com/word?length=5");
        const data = await res.json();
        const candidate = data[0];

        // 2. Check if it's a real word using dictionary API
        const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${candidate}`);
        if (dictRes.ok) {
          validWord = candidate;
        }
        // If not valid, loop again
      } catch (error) {
        console.error("Error fetching word:", error);
        break; // Avoid infinite loop on network error
      }
    }
    setWord(validWord);
  };

  useEffect(() => {
    fetchWord();
  }, [round]); // refetch word when round changes

  const handleNextRound = () => {
    setShowModal(false);
    setWord(null); // Set to null before fetching new word
    setRound(r => r + 1); // triggers useEffect to fetch new word
  };

  return (
    <div className='w-[100%] h-[100vh] justify-center items-center flex flex-col'>
      <h1 className="w-[100vw] text-center text-4xl font-bold mb-4">Wordle Clone</h1>
      {word ? (
        <Wordle solution={word} onGameEnd={() => setShowModal(true)} />
      ) : (
        <p>Loading word...</p>
      )}
      {showModal && <Modal onNextRound={handleNextRound} solution={word} />}
    </div>
  );
}

export default App;
