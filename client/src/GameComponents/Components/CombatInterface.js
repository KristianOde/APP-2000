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

{/** Kristian START */}

{/**Returfunksjon for å opprette og returnere en tabell med monstre.
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

{/**Hovedfunksjonen til CombatInterface-komponenten */}
const CombatInterface = 
({gold, setGold, chosenLanguage, message, setMessage, setGameState, party, setParty}) => {
    const isMount = useIsMount()
    {/* Hooks for states 
        buttonLastClicked lagrer hvilken knapp i brukergrensesnittet som
        sist ble klikket på slik at andre komponenter kan gi passende 
        informasjon og funksjoner utføre riktige handlinger.
        monsters blir i hver kamp fylt med en kort liste av monstre
        som blir rendret i kampgrensesnittet. */}
    const [buttonLastClicked, setButtonLastClicked] = useState('')
    const [monsters, setMonsters] = useState([])
    const [goldEarned, setGoldEarned] = useState(0)
    const [deadAdventurers, setDeadAdventurers] = useState(0)
    const [doingAction, setDoingAction] = useState(false)
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
        console.log("deadAdventurers: " + deadAdventurers)
        if (deadAdventurers === 4) {
            setGameState("gameover")
            setMessage(msg.battleLost)
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

    {/**Funksjon for å håndtere hva som skjer når du klikker på et
        monster. Den sjekker først buttonLastClicked for å hovedsakelig
        avgjøre om du skal og kan angripe dem eller ikke. 
        Om du ikke har valgt "attack" eller "spell" vil det ikke skje noe.*/}
    const handleAction = (target) => {
        switch(buttonLastClicked) {
            case 'attack':
                attack(target)
                setButtonLastClicked(null)
                break
            case 'spell':
                castSpell(target)
                setButtonLastClicked(null)
                break
            default:
                setButtonLastClicked(null)
                break
        }
    }

    {/**Funksjon for gjennomgang av å angripe et monster 
        Det første den sjekket er her en boolean check
        for om det pågår en handling nå via doingAction.
        Er doingAction true vil ingenting av koden her fyre av,
        da det betyr at en handling pågår (f.eks at du nettopp
        har gjort en handling selv og fiender skal angripe tilbake
        osv.
        Er den false vil det være OK å utføre nye handlinger.
        Aller først settes doingAction til true slik at du ikke
        kan umiddelbart gjøre en ny handling så fort dette pågår.
        */}
    const attack = (target) => {
        if (!doingAction) {
            setDoingAction(true)
            {/** Kopierer data fra state */}
            const updatedMonsters = JSON.parse(JSON.stringify(monsters))
            const damage = getCalculatedDamage(party)
            updatedMonsters.forEach(function (m, index) {
                if (m.id === target.id) {
                    m.health = m.health - damage
                    if (m.health <= 0) {
                        setTimeout(() => {
                            setMessage(msg.enemyDead + m.name)
                        }, 1000)
                        setGoldEarned(goldEarned + m.gold)
                        updatedMonsters.splice(index, 1)
                    }
                }
            })
            setMessage(msg.damageDone1 + damage + msg.damageDone2 + target.name)
            {/**Gjør en sjekk for om du har vunnet kampen
                (dvs monstertabellen har blitt tom) 
                er den ikke det, vil monstrene få gjøre en runde
                via "takeDamage()"*/}
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
            {/**Oppdaterer state med oppdaterte data */}
            setMonsters(updatedMonsters)    
        }
    }

    {/**Samme opplegg som for attack, men alle
        monstre vil ta skade istedet for bare en */}
    const castSpell = (target) => {
        if (!doingAction) {
            setDoingAction(true)
            const updatedMonsters = JSON.parse(JSON.stringify(monsters))
            const damage = Math.round(getCalculatedDamage(party)/2)
            updatedMonsters.forEach(function (m, index) {
                m.health = m.health - damage
                if (m.health <= 0) {
                    setTimeout(() => {
                        setMessage(msg.enemyDead + m.name)
                    }, 1000)
                    setGoldEarned(goldEarned + m.gold)
                    updatedMonsters.splice(index, 1)
                }
            })
            setMessage(msg.damageDone1 + damage + msg.damageDone2 + " to all monsters")
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
    }

    {/**Funksjon som kalkulerer skaden som skal gjøres.
        Brukes for både monstre og eventyrerne. Skaden som
        gjøres er angriperenes samlet styrke pluss et lite
        tilfeldig tall. Bare de overlevende av de angripende
        får skaden sin lagt til summen. */}
    const getCalculatedDamage = (attackers) => {
        let totalStrength = 0
        attackers.forEach(function (m) {
            if (m.health > 0) {
                console.log(m.name+" "+m.strength)
                totalStrength += m.strength    
            }
        })
        totalStrength += totalStrength * (randomNumber(10)/100)
        return Math.round(totalStrength)
    }

    {/**Funksjon for hva som skjer om du har vunnet en kamp.
        Blir kalt på i attack-metoden når lengden på monsterarray
        er lavere enn 1 */}
    const battleWon = () => {
        setMessage(msg.battleWon + goldEarned + msg.battleWonGold)
        setGold(gold + goldEarned)
        setDoingAction(false)
        setTimeout(() => {
            setGameState("dungeon")
        }, 3000);
    }

    {/**Funksjon for at monster angriper spilleren */}
    const takeDamage = () => {
        {/**target blir et tilfeldig tall, for å avgjøre hvem
            av eventyrerne som tar skade */}
        let target = randomNumber(4)
        {/**en boolean check for å se om skaden er blitt gjort,
            for å gjøre en do while-løkke */}
        let damageDealt = false
        const damage = getCalculatedDamage(monsters)
        const updatedParty = JSON.parse(JSON.stringify(party))
        {/**do while-løkke som garanterer at noen i live tar skade,
            i tilfelle noen av eventyrerne har dødd */}
        do {
            updatedParty.forEach(function (adv, index) {
                if (adv.health > 0 && target-1 === index) {
                    adv.health = adv.health - damage
                    setMessage(adv.name + msg.damageTaken1 + damage + msg.damageTaken2)
                    damageDealt = true
                    if (adv.health <= 0) {
                        setDeadAdventurers(deadAdventurers + 1)
                        adv.health = 0
                        adv.imgUrl = "rip.png"
                    }    
                }
            })
            target = randomNumber(4)
        }
        while (!damageDealt)
        setParty(updatedParty)
        setDoingAction(false)
    }

    {/**En heal-funksjon.
        Den skal se etter eventyreren med lavest helse,
        og gi dem tilbake 100 helse så lenge de ikke er døde
        eller allerede full helse. Dette tells som en runde, så
        fienden får angripe etterpå.
        Koden er ikke riktig skrevet dessverre... */}
    const heal = () => {
        if (!doingAction) {
            setDoingAction(true)
            let lowestHealth = 999
            let indexOfLowestHealthPartyMember
            const updatedParty = JSON.parse(JSON.stringify(party))
            updatedParty.forEach(function (adv, index) {
                if (adv.health < lowestHealth) {
                    lowestHealth = adv.health
                    indexOfLowestHealthPartyMember = index
                }
            })
            updatedParty.forEach(function (adv, index) {
                if (indexOfLowestHealthPartyMember === index 
                    && adv.health < adv.maxhealth
                    && adv.health > 0) {
                    adv.health += 100
                    if (adv.health > adv.maxhealth) {
                        adv.health = adv.maxhealth
                    }
                    setMessage(adv.name + msg.healChosen)
                }
            })
            setParty(updatedParty)
            setTimeout(() => {
                takeDamage()
            }, 2000)

        }
    }

    {/**Funksjon for å løpe vekk.
        Det blir rullet mellom 1 eller 2,
        om du ruller 1 vil du også miste halvparten
        av gullet ditt når du har løpt. */}
    const runAway = () => {
        if (!doingAction) {
            const roll = randomNumber(2)
            if (roll === 1) {
                setMessage(msg.runFail)
                setGold(gold/2);    
            }
            else {
                setMessage(msg.runSuccess)
            }
            setGameState("dungeon")    
        }
    }

    {/**Funksjon som kaller på setButtonLastClicked().
        Denne funksjonen sendes videre til ContextContainer-komponenten,
        og lagrer hvilken handling brukeren vil utføre i kampen. */}
    const handleClick = i => {
        if (!doingAction) {
            setButtonLastClicked(i)
            console.log(buttonLastClicked)    
        }
    }

    {/* hva CombatInterface skal rendre */}
    return (
        <div className='gameInterface'>
            <LeftContainer 
                gold={gold}
                chosenLanguage={chosenLanguage}
            />
            <ContextContainer 
                setMessage={setMessage}
                handleClick={handleClick}
                heal={heal}
                runAway={runAway}
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