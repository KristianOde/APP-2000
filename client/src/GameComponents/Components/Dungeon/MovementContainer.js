import React from 'react'
import '../../Styles/Movement.css'
import { randomNumber } from '../helper'

{/* Kristian START */}

{/**Komponent for bevegelsesfunksjonalitet i
    dungeonutforsking. */}
const MovementContainer = props => {

    {/**Funksjon for å flytte seg i en dungeon.
        For hver gang du flytter deg vil det bli
        trukket et tilfeldig nummer fra 1 til 100.
        Er dette tallet 25 eller lavere, vil en kamp
        starte ved at setGameState("combat") blir kalt */}
    const move = () => {
        const battleChance = randomNumber(100)
        if (battleChance <= 25) {
            props.setGameState("combat")
        }
    }
    
    return(
        <div className='contextContainer movementContainer'>
            {/* <button className='movementButton empty'> - </button> */}
            <button
                value="up"
                className='movementButton upBtn box'
                onClick={() => move()}
            >↑</button>
            <button
                value="left"
                className='movementButton leftBtn box'
                onClick={() => move()}
            >←</button>
            <button
                value="down"
                className='movementButton downBtn box'
                onClick={() => move()}
            >↓</button>

            <button
                value="right"
                className='movementButton rightBtn box'
                onClick={() => move()}
            >→</button>
        </div>
    )
}

{/* Kristian END */}

export default MovementContainer