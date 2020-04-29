import React, { useState, useEffect } from 'react'
import MiddleCombatContainer from './Interface/MiddleCombatContainer'
import LeftContainer from './Interface/LeftContainer'
import ContextContainer from './Interface/ContextContainer'
import RightContainer from './Interface/RightContainer'
import BottomCombatContainer from './Interface/BottomCombatContainer.js'
import MapContainer from './MapContainer'
import QuestContainer from './QuestContainer'
import '../Styles/GameInterface.css'
import monsterData from '../Data/monsterData'
import { randomNumber, useIsMount } from './helper'

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
        table.push(monsterData.Monster[(randomNumber(7))-1])
    }
    var table1 = JSON.parse(JSON.stringify(table));
    for (let i = 0; i < table.length; i++) {
        {/**Gir hvert monster av samme type litt ulik helse, for variasjon */}
        table1[i].health += (randomNumber(150))
        {/** Gir hvert monster en unik id og nøkkel */}
        table1[i].id = table1[i].name + (i+1)
    }
    return table1
}

{/* Hovedfunksjonen til CombatInterface-komponenten */}
const CombatInterface = 
({miscStats, chosenLanguage, setGameState, party, setParty}) => {
    const isMount = useIsMount()
    {/* Hooks for states 
        buttonLastClicked lagrer hvilken knapp i brukergrensesnittet som
        sist ble klikket på slik at andre komponenter kan gi passende 
        informasjon og funksjoner utføre riktige handlinger.
        monsters blir i hver kamp fylt med en kort liste av monstre
        som blir rendret i kampgrensesnittet. */}
    const [buttonLastClicked, setButtonLastClicked] = useState('')
    const [monsters, setMonsters] = useState([])
    const [message, setMessage] = useState("")
    const msg = chosenLanguage.CombatDialogue[0]

    {/**useEffect() kalles hver gang denne komponenten "mountes" 
        eller blir oppdatert, det vil si hver gang den blir rendret
        av kompilatoren. I React blir komponenter re-rendret hver gang
        f.eks state-variabler endrer seg. Slik kan man sørge for at 
        spesifikke metoder skal kjøre hver gang det skjer en endring.*/}
    useEffect(() => {
        updateFight()
        {/**Switch som bestemmer hva beskjeden i dialogboksen skal være 
            etter at du har trykket på en kommando*/}
        switch(buttonLastClicked) {
            case 'attack':
                setMessage(msg.attackChosen)
                break
            case 'spell':
                setMessage(msg.spellChosen)
                break
            case 'item':
                setMessage(msg.itemChosen)
                break
            case 'run':
                setMessage(msg.runChosenFail)
                break
            default:
                break
        }
    })

    {/**Metode som blir kalt på fra useEffect-hooken.
        Den sjekker først om hjelpevariabelen isMount er true.
        Om den er det betyr det at dette er første gang komponenten
        blir "montert"/rendret og koden i if-setningen kan trygt kjøres.
        Koden som blir kjørt her er et kall på setMonsters()-hooken,
        hvor monsters blir generert med generateEncounterData()-metoden.
        Etter det initierer det en dialogmelding som sier fra til
        spilleren at det er en start på en ny kamp.*/}
    const updateFight = () => {
        if (isMount) {
            setMonsters(
                // ...monsters,
                generateEncounterData()
            )
            setMessage(msg.combatStart)
        }
    }

    {/* Funksjon for å håndtere hva som skjer når du klikker på et
        monster. Den sjekker først buttonLastClicked for å hovedsakelig
        avgjøre om du skal og kan angripe dem eller ikke. */}
    const handleAction = (target) => {
        switch(buttonLastClicked) {
            case 'attack':
                attack(target)
                setButtonLastClicked(null)
                break
            default:
                setButtonLastClicked(null)
                break
        }
    }

    {/**Funksjon for gjennomgang av å angripe et monster */}
    const attack = (target) => {
        const updatedMonsters = JSON.parse(JSON.stringify(monsters))
        console.log(monsters)
        const damage = randomNumber(200)
        updatedMonsters.forEach(function (m, index) {
            if (m.id === target.id) {
                m.health = m.health - damage
                if (m.health <= 0) {
                    setTimeout(() => {
                        setMessage(msg.enemyDead + m.name)
                    }, 1000)
                    updatedMonsters.splice(index, 1)
                }
            }
        })
        setMessage(msg.damageDone1 + damage + msg.damageDone2 + target.name)
        if (updatedMonsters.length < 1) {
            setTimeout(() => {
                battleWon()
            }, 3000);
        }
        else if (updatedMonsters.length > 0) {
            setTimeout(() => {
                takeDamage()
            }, 1700);    
        }
        setMonsters(updatedMonsters)
    }

    {/**Funksjon for hva som skjer om du har vunnet en kamp.
        Blir kalt på i attack-metoden når lengden på monsterarray
        er lavere enn 1 */}
    const battleWon = () => {
        setMessage(msg.battleWon)
        setTimeout(() => {
            setGameState("dungeon")
        }, 3000);
    }

    {/**Funksjon for at monster angriper spilleren */}
    const takeDamage = () => {
        const target = randomNumber(4)
        const damage = randomNumber(100)
        console.log(party)
        const updatedParty = JSON.parse(JSON.stringify(party))
        updatedParty.forEach(function (adv, index) {
            if (target-1 === index) {
                console.log(adv.name + adv.health)
                adv.health = adv.health - damage
                setMessage(adv.name + msg.damageTaken1 + damage + msg.damageTaken2)
            }
        })
        setParty(updatedParty)
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
                setMessage={setMessage}
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
            <RightContainer party={party}/>
            <BottomCombatContainer 
                chosenLanguage={chosenLanguage}
                message={message}
            />
            {/*Jørgen start*/}
            <MapContainer className="mapContainer" />
            <div className="empty"></div>
            {/*Jørgen slutt*/}    

            {/*Robin start*/}
            <QuestContainer className="questContainer" />
            {/*Robin start*/}
        </div>
    )
}

{/* Kristian END*/}

export default CombatInterface