import React, { useEffect } from 'react'
import Monster from './Monster'
//import monsterData from '../../Data/monsterData'

const MonsterDisplay = props => {
    const monsterComponents = props.monsters.map((monster, index) =>
            <Monster 
                buttonLastClicked={props.buttonLastClicked}
                handleCombatAction={props.handleCombatAction}
                setMonsters={props.setMonsters}
                id={monster.name+index}
                key={monster.name+index}
                monsterdata={monster}
            />
        )
        
    return (
        <div className="monsterDisplay">
            {monsterComponents}
        </div>
    )
}

export default MonsterDisplay