import React from 'react'
import '../../Styles/Movement.css'
import { randomNumber } from '../helper'


const MovementContainer = props => {
    const move = () => {
        const battleChance = randomNumber(100)
        console.log(battleChance)
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

export default MovementContainer