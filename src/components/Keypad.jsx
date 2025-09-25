import React, { useEffect, useState } from 'react'

function Keypad({usedKeys}) {
    const [letters, getLetters] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}/letters.json`)
        .then(res => res.json())
        .then(json => {
            getLetters(json);
        });
    }, [])

    return (
        <div className="flex flex-wrap gap-2 max-w-[500px] justify-center mt-4 items-center">
            {letters && letters.map((l) => {
                const color = usedKeys[l.key]
                let colorClass = '';
                    if (color === 'green') colorClass = 'bg-green-500';
                    if (color === 'yellow') colorClass = 'bg-yellow-400';
                    if (color === 'grey') colorClass = 'bg-gray-400';
                return(
                <div
                    key={l.key}
                    className={`rounded ${colorClass} w-8 h-8 flex items-center justify-center text-lg`}
                >
                    {l.key}
                </div>
                )
            })}
        </div>
    )
}

export default Keypad