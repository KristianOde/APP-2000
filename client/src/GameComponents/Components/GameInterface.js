import React, { useState, useEffect } from 'react'
import CombatInterface from './CombatInterface'
import DungeonView from './Dungeon/DungeonView'
import GameOverView from './GameOverView'
import adventurerData from '../Data/adventurerData.json'
import { randomNumber, useIsMount } from './helper'

{/* Kristian START */}

const generateParty = () => {
    let table = []
    for (let i = 0; i < 4; i++) {
        table.push(adventurerData.Adventurer[i])
    }
    return table
}

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
const GameInterface = ({chosenLanguage}) => {
    const isMount = useIsMount() 
    {/**State-variabler for spillets "gameState" eller 
        spilltilstand, som for eksempel om du går gjennom
        en hule eller om du er i en kamp. */}
    const [gameState, setGameState] = useState("combat")  
    const [message, setMessage] = useState("")
    const [gold, setGold] = useState(100)
    const [party, setParty] = useState([adventurerData])

    useEffect(() => {
        if (isMount) {
            setParty(generateParty())
        }
        console.log(chosenLanguage)
    })

    {/**Her brukes det "conditional operators", som er en 
        annen måte å skrive if-setninger, for å avgjøre hva slags
        komponenter som skal "mountes"/rendres basert på
        gameState-variabelen.*/}
    return (
        <div className=''>
            {(gameState === "dungeon") ?
                <DungeonView 
                    gold={gold}
                    chosenLanguage={chosenLanguage}
                    setGameState={setGameState}
                    party={party}
                    message={message}
                />
                : null
            }
            {(gameState === "combat") ? 
                <CombatInterface
                    message={message}
                    setMessage={setMessage} 
                    gold={gold}
                    setGold={setGold}
                    chosenLanguage={chosenLanguage}
                    setGameState={setGameState}
                    party={party}
                    setParty={setParty}
                />
                : null
            }
            {(gameState === "gameover") ? 
                <GameOverView /> 
                : null}
        </div>
    )
}

{/* Kristian END */}

export default GameInterface