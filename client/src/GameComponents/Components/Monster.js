import React from 'react'

/* Enkel funksjon brukt for testing */
function generateColor() {
    return '#' +  Math.random().toString(16).substr(-6);
    //{backgroundColor: generateColor()}
} 

/* "onClick={() => props.attack(props.monsterinfo.id)}" gir attack-metoden en id */
function Monster(props) {
    const AliveOrDead = {
        display: 'none'
    }
    return (
        <div className="monsterBox" style={props.monsterinfo.alive?null:AliveOrDead} onClick={() => props.attack(props.monsterinfo.id)} >
            <p>{props.monsterinfo.name}</p>
            <p>{props.monsterinfo.health}</p>
            <p>{props.monsterinfo.strength}</p>
        </div>
    )
}

export default Monster