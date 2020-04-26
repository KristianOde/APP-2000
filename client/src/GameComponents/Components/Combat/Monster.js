import React, {useState} from 'react'

/* Enkel funksjon brukt for testing */
function generateColor() {
    return '#' +  Math.random().toString(16).substr(-6);
    //{backgroundColor: generateColor()}
} 

const Monster = props => {
    return (
        <div 
            className="monsterBox"
            value={props.monsterdata.id}
            onClick={(props.handleCombatAction(props.monsterdata.id))}
        >
            <p>{props.monsterdata.name}</p>
            <p>{props.monsterdata.health}</p>
            <p>{props.monsterdata.strength}</p>
        </div>
    )
}

export default Monster