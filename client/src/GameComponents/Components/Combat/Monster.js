import React from 'react'
import '../../Styles/AnimatedComponents.css'
import { useEffect } from 'react'

{/* Kristian START */}

/**Komponent for monster */
const Monster = props => {
    let className = "monsterBox monsterAnim"

    // useEffect(() => {
    //     if (props.takingDamage === true) {
    //         className = "monsterBox monsterAnim takingDamage"
    //     }
    
    // })

    return (
        <div 
            className={className}
            onClick={() => props.handleAction(props.monsterdata)}
        >
            
            <div className="monster-info">
                <span>{props.monsterdata.name}</span>
                <p>HP{props.monsterdata.health}</p>
            </div>
            <img src={props.monsterdata.img} alt={props.monsterdata.name} className="box-monster"/>
        </div>
    )
}

{/* Kristian END */}

export default Monster