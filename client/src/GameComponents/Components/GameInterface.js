import React, { useState, useEffect } from 'react'
import CombatInterface from './CombatInterface'
import DungeonView from './Dungeon/DungeonView'
import adventurerData from '../Data/adventurerData.json'
import { randomNumber, useIsMount } from './helper'

{/* Kristian START */}

const generateParty = () => {
    let table = []
    // const numberOfMonsters = randomNumber(5)
    for (let i = 0; i < 4; i++) {
        table.push(adventurerData.Adventurer[i])
    }
    // var table1 = JSON.parse(JSON.stringify(table));
    // for (let i = 0; i < table.length; i++) {
    //     {/**Gir hvert monster av samme type litt ulik helse, for variasjon */}
    //     table1[i].health += (randomNumber(150))
    //     {/** Gir hvert monster en unik id og nøkkel */}
    //     table1[i].id = table1[i].name + (i+1)
    // }
    console.log("party:")
    console.log(table)
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
const GameInterface = ({miscStats, chosenLanguage}) => {
    const isMount = useIsMount() 
    {/**State-variabler for spillets "gameState" eller 
        spilltilstand, som for eksempel om du går gjennom
        en hule eller om du er i en kamp. */}
    const [gameState, setGameState] = useState("combat")   
    const [party, setParty] = useState([adventurerData]) 

    useEffect(() => {
        if (isMount) {
            setParty(generateParty())
        }
    })

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
                    party={party}
                />
                : null
            }
            {(gameState === "combat") ? 
                <CombatInterface 
                    miscStats={miscStats}
                    chosenLanguage={chosenLanguage}
                    setGameState={setGameState}
                    party={party}
                    setParty={setParty}
                />
                : null
            }
        </div>
    )
}

{/* Kristian END */}

export default GameInterface