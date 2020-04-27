import React, { useState, useEffect } from 'react'
import MiddleCombatContainer from './Interface/MiddleCombatContainer'
import LeftContainer from './Interface/LeftContainer'
import ContextContainer from './Interface/ContextContainer'
import RightContainer from './Interface/RightContainer'
import BottomCombatContainer from './Interface/BottomCombatContainer.js'
import '../Styles/GameInterface.css'
import useIsMount from '../useIsMount'
import monsterData from '../Data/monsterData'
import { randomNumber } from './helper'

{/* Kristian START */}

{/* Returfunksjon for å opprette og returnere en tabell med monstre.
    Først avgjøres det hvor mange monstre som dukker opp via
    hjelpefunksjonen 'randomNumber(5)' (5 definerer høyest tillatt
    nummer), lest inn fra en hjelpefil. Deretter kjøres det en løkke
    hvor den henter vilkårlige monstre fra tabellen monsterData.json
    og pusher de til en tabell som funksjonen returnerer. */}
const generateEncounterData = () => {
    let table = []
    const numberOfMonsters = randomNumber(5)
    for (let i = 0; i < numberOfMonsters; i++) {
        table.push(monsterData.Monster[(randomNumber(5))-1])
    }
    return table
}

{/* Hovedfunksjonen til CombatInterface-komponenten */}
const CombatInterface = ({miscStats, chosenLanguage, setGameState}) => {
    const isMount = useIsMount()
    {/* Hooks for states 
        buttonLastClicked lagrer hvilken knapp i brukergrensesnittet som
        sist ble klikket på slik at andre komponenter kan gi passende 
        informasjon og funksjoner utføre riktige handlinger.
        monsters blir i hver kamp fylt med en kort liste av monstre
        som blir rendret i kampgrensesnittet. */}
    const [buttonLastClicked, setButtonLastClicked] = useState('')
    const [monsters, setMonsters] = useState([])

    {/* useEffect() kalles hver gang denne komponenten "mountes" 
        eller blir oppdatert, det vil si hver gang den blir rendret
        av kompilatoren.
        Her kaller den på setMonsters-hooken, med et kall på
        generateEncounterData() for å lagre en tabell i monsters-state. 
        Det er viktig at isMount-variabelen blir sjekket, hvis ikke vil
        setMonsters() blir kalt på hver gang dataene om monstrene
        blir oppdatert. */}
    useEffect(() => {
        if (isMount) {
            setMonsters(
                ...monsters,
                generateEncounterData()
            )
        }
    })

    {/* Funksjon for å håndtere hva som skjer når du klikker på et
        monster. Den sjekker først buttonLastClicked for å hovedsakelig
        avgjøre om du skal og kan angripe dem eller ikke. */}
    const handleAction = (id) => {
        switch(buttonLastClicked) {
            case 'attack':
                // setMonsters([{
                //     ...monsters,

                // }])
                console.log(id)
                //setButtonLastClicked(null)
                break
            default:
                //setButtonLastClicked(null)
                break
        }
    }

    {/* Funksjon som kaller på setButtonLastClicked().
        Denne funksjonen sendes videre til ContextContainer-komponenten,
        og lagrer hvilken handling brukeren vil utføre i kampen. */}
    const handleClick = i => {
        setButtonLastClicked(i)
        console.log(buttonLastClicked)
    }

    {/* hva CombatInterface skal rendre */}
    return (
        <div className='gameInterface'>
            <LeftContainer 
                miscStats={miscStats}
                chosenLanguage={chosenLanguage}
            />
            <ContextContainer 
                handleClick={handleClick}
                chosenLanguage={chosenLanguage}
                setGameState={setGameState}
            />
            <MiddleCombatContainer
                handleAction={handleAction}
                buttonLastClicked={buttonLastClicked}
                monsters={monsters}
                setMonsters={setMonsters}
            />
            <RightContainer />
            <BottomCombatContainer 
                contextClicked={buttonLastClicked}
                chosenLanguage={chosenLanguage}
            />
        </div>
    )
}

{/* Kristian END*/}

export default CombatInterface