import React from 'react'
import MonsterDisplay from '../Combat/MonsterDisplay'

const MiddleCombatContainer = props => {
    return (
        <div className='middleContainer box'>
            <MonsterDisplay
                buttonLastClicked={props.buttonLastClicked}
                handleCombatAction={props.handleCombatAction}
                monsters={props.monsters}
                setMonsters={props.setMonsters}
            />
        </div>
    )
}

export default MiddleCombatContainer