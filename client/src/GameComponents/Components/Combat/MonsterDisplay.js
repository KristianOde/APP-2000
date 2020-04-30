import React, { useEffect } from 'react'
import Monster from './Monster'

{/* Kristian START */}

{/**Komponent for å rendre monstrene i kamp.
    Fra CombatInterface sin state får den en tabell over monstre
    (props.monsters) og mapper hver tabellrad til hvert sitt
    Monster-komponent. Når MonsterDisplay sin retur-setning fyres av,
    får man tilbake en rekke med Monster-komponenter inni en vanlig div
    via kallet "{monsterDisplay}"*/}
const MonsterDisplay = props => {
    const monsterComponents = props.monsters.map(monster =>
            <Monster
                buttonLastClicked={props.buttonLastClicked}
                handleAction={props.handleAction}
                setMonsters={props.setMonsters}
                id={monster.id}
                key={monster.id}
                monsterdata={monster}
            />
        )
        
    return (
        <div className="monsterDisplay">
            {monsterComponents}
        </div>
    )
}

{/* Kristian END */}

export default MonsterDisplay