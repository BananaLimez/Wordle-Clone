 import React from 'react'
 
 function Row({guess, currentGuess}) {

    if(guess){
        return(
        <div className='flex'>
            {/* remember {} is not implicit return, () is implicit return */}
            {guess.map((l, i)=>{
                    let colorClass = '';
                    if (l.color === 'green') colorClass = 'bg-green-500';
                    if (l.color === 'yellow') colorClass = 'bg-yellow-400';
                    if (l.color === 'grey') colorClass = 'bg-gray-400';
                return(
                    <div key={i} className={`w-[60px] h-[60px] border-1 rounded m-1 ${colorClass} uppercase
                    flex items-center justify-center`}>{l.key}</div>
                )
            })}
        </div>
        )
    }

    if(currentGuess){
        let letters = currentGuess.split('');
        return (
            <div className='flex'>
                {letters.map((l, i) =>{ 
                    return (<div key={i} className='w-[60px] h-[60px] border-1 rounded m-1 uppercase
                    flex items-center justify-center'>{l}</div>)
            })}
            {...Array(5 - letters.length).fill('').map((_, i) => (
                <div key={i} className='w-[60px] h-[60px] border-1 rounded m-1'></div>
            ))}
            </div>
        );
    }


   return (
     <div className='flex'>
        <div className='w-[60px] h-[60px] border-1 rounded m-1'></div>
        <div className='w-[60px] h-[60px] border-1 rounded m-1'></div>
        <div className='w-[60px] h-[60px] border-1 rounded m-1'></div>
        <div className='w-[60px] h-[60px] border-1 rounded m-1'></div>
        <div className='w-[60px] h-[60px] border-1 rounded m-1'></div>
     </div>
   )
 }
 
 export default Row;