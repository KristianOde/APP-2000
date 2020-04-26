import React, { useState } from 'react'
import CombatInterface from './CombatInterface'
import DungeonView from './Dungeon/DungeonView'

const GameInterface = ({miscStats, chosenLanguage}) => {
    const [gameState, setGameState] = useState("dungeon")    

    return (
        <div className=''>
            {(gameState === "dungeon") ?
                <DungeonView 
                    miscStats={miscStats}
                    chosenLanguage={chosenLanguage}
                    setGameState={setGameState}
                />
                : null}
            {(gameState === "combat") ? 
                <CombatInterface 
                    miscStats={miscStats}
                    chosenLanguage={chosenLanguage}
                    setGameState={setGameState}
                />
                : null
            }
        </div>
    )
}

export default GameInterface