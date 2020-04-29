import React from 'react'
import MonsterDisplay from '../Combat/MonsterDisplay'

{/* Kristian START */}

{/**Komponent for ruta i midten som inneholder monstrene*/}
const MiddleCombatContainer = props => {
    return (
        <div className='middleContainer box'>
            <MonsterDisplay
                takingDamage={props.takingDamage}
                buttonLastClicked={props.buttonLastClicked}
                handleAction={props.handleAction}
                monsters={props.monsters}
                setMonsters={props.setMonsters}
            />
        </div>
    )
}

{/* Kristian END */}

export default MiddleCombatContainer