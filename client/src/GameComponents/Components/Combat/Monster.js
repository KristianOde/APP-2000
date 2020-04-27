import React, {useState} from 'react'

{/* Kristian START */}

/**Komponent for monster */
const Monster = props => {
    return (
        <div 
            className="monsterBox"
            value={props.monsterdata.id}
            onClick={(props.handleAction(props.monsterdata.id))}
        >
            <p>{props.monsterdata.name}</p>
            <p>{props.monsterdata.health}</p>
            <p>{props.monsterdata.strength}</p>
        </div>
    )
}

{/* Kristian END */}

export default Monster