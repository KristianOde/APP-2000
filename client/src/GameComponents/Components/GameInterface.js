import React, { useState } from 'react'
import CombatInterface from './CombatInterface'
import DungeonView from './Dungeon/DungeonView'
import MapContainer from './MapContainer'

{/* Kristian START */}

{/**Selve spillkomponentet. Kunne bare vært en del av App.js,
    men det var opprinnelig andre planer for App.js som 
    har rotet det noe til.
    Parameterene miscStats og chosenLanguage i funksjonserklæringen
    kalles i denne sammenhengen "props", og peker vanligvis på 
    state-verdier fra "parent components". Det krever at man
    har sendt med state-verdiene i komponentkallet fra forelderen.
    Man kan evt bare skrive "props" som parameter istedetfor de 
    spesifikke variablene, og da skrive (f.eks) "props.miscStats" inne
    i funksjonen, som jeg har gjort i flere av de andre komponentene.
 */}
const GameInterface = ({miscStats, chosenLanguage}) => {
    {/**State-variabler for spillets "gameState" eller 
        spilltilstand, som for eksempel om du går gjennom
        en hule eller om du er i en kamp. */}
    const [gameState, setGameState] = useState("combat")    

    {/**Her brukes det "conditional operators", som er en 
        annen måte å skrive if-setninger, for å avgjøre hva slags
        komponenter som skal "mountes"/rendres basert på
        gameState-variabelen.*/}
    return (
        <div className=''>
            {(gameState === "dungeon") ?
                <DungeonView 
                    miscStats={miscStats}
                    chosenLanguage={chosenLanguage}
                    setGameState={setGameState}
                />
                : null
            }
            {(gameState === "combat") ? 
                <CombatInterface 
                    miscStats={miscStats}
                    chosenLanguage={chosenLanguage}
                    setGameState={setGameState}
                />
                : null
            }
            <MapContainer />
        </div>
    )
}

{/* Kristian END */}

export default GameInterface